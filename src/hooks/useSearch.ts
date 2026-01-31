import { useCallback, useEffect, useMemo, useState } from "react";

interface UseSearchOptions {
  initialValue?: string;
  debounceMs?: number;
  minLength?: number;
  caseSensitive?: boolean;
  trimWhitespace?: boolean;
}

interface UseSearchResult {
  searchTerm: string;
  debouncedSearchTerm: string;
  setSearchTerm: (value: string) => void;
  clearSearch: () => void;
  isSearching: boolean;
  hasSearchTerm: boolean;
  isValidSearch: boolean;
  searchInText: (text: string) => boolean;
  searchInArray?: <T>(
    array: T[],
    getSearchableText: (item: T) => string,
  ) => T[];
}

export const useSearch = (options: UseSearchOptions = {}): UseSearchResult => {
  const {
    initialValue = "",
    debounceMs = 300,
    minLength = 1,
    caseSensitive = false,
    trimWhitespace = false,
  } = options;

  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const isSearching = useMemo(() => {
    return searchTerm !== debouncedSearchTerm;
  }, [searchTerm, debouncedSearchTerm]);

  const hasSearchTerm = useMemo(() => {
    const term = trimWhitespace ? searchTerm.trim() : searchTerm;
    return term.length > 0;
  }, [searchTerm, trimWhitespace]);

  const isValidSearch = useMemo(() => {
    const term = trimWhitespace ? searchTerm.trim() : searchTerm;
    return term.length > minLength;
  }, [searchTerm, minLength, trimWhitespace]);

  const searchInText = useCallback(
    (text: string): boolean => {
      if (!hasSearchTerm) return true;

      const searchValue = trimWhitespace ? searchTerm.trim() : searchTerm;
      const textValue = trimWhitespace ? text.trim() : text;

      if (caseSensitive) {
        return textValue.includes(searchValue);
      } else {
        return textValue.toLowerCase().includes(searchValue.toLowerCase());
      }
    },
    [hasSearchTerm, searchTerm, trimWhitespace, caseSensitive],
  );

  return {
    searchTerm,
    debouncedSearchTerm,
    setSearchTerm,
    clearSearch,
    isSearching,
    hasSearchTerm,
    isValidSearch,
    searchInText,
  };
};
