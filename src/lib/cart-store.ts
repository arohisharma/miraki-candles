"use client";

import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; quantity: number };

const STORAGE_KEY = "miraki-cart";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw);
  } catch {
    items = EMPTY;
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable; cart still works for this page view
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    try {
      items = e.newValue ? JSON.parse(e.newValue) : EMPTY;
    } catch {
      items = EMPTY;
    }
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

export function addToCart(slug: string, quantity = 1) {
  load();
  const existing = items.find((i) => i.slug === slug);
  commit(
    existing
      ? items.map((i) => (i.slug === slug ? { ...i, quantity: i.quantity + quantity } : i))
      : [...items, { slug, quantity }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  load();
  commit(
    quantity <= 0
      ? items.filter((i) => i.slug !== slug)
      : items.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
  );
}

export function clearCart() {
  load();
  commit(EMPTY);
}

export function removeFromCart(slug: string) {
  setQuantity(slug, 0);
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
