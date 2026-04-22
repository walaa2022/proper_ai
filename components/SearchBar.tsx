"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MapPin, Home as HomeIcon, Wallet } from "lucide-react";

export default function SearchBar() {
  const { lang } = useLanguage();

  const labels =
    lang === "AR"
      ? {
          where: "أين",
          whereP: "مدينة أو حي",
          what: "النوع",
          whatP: "شقة، فيلا...",
          budget: "الميزانية",
          budgetP: "أي ميزانية",
          go: "ابحث",
        }
      : {
          where: "Where",
          whereP: "City or area",
          what: "Type",
          whatP: "Any property",
          budget: "Budget",
          budgetP: "Any budget",
          go: "Search",
        };

  return (
    <form
      role="search"
      className="search-bar"
      aria-label={labels.go}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="field">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent)",
          }}
        >
          <MapPin size={11} aria-hidden />
          <span>{labels.where}</span>
        </span>
        <input type="text" placeholder={labels.whereP} aria-label={labels.where} />
      </label>
      <label className="field">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent)",
          }}
        >
          <HomeIcon size={11} aria-hidden />
          <span>{labels.what}</span>
        </span>
        <input type="text" placeholder={labels.whatP} aria-label={labels.what} />
      </label>
      <label className="field">
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "var(--accent)",
          }}
        >
          <Wallet size={11} aria-hidden />
          <span>{labels.budget}</span>
        </span>
        <input type="text" placeholder={labels.budgetP} aria-label={labels.budget} />
      </label>
      <button type="submit" className="search-btn" aria-label={labels.go}>
        <Search size={14} aria-hidden strokeWidth={2.25} />
        <span className="hidden-sm">{labels.go}</span>
      </button>
    </form>
  );
}
