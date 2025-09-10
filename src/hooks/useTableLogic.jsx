import { useState, useEffect, useCallback } from "react";

const limit = 30;

export function useTableLogic(dataSource, searchBy = "nome") {
  const [filteredAndSortedElements, setFilteredAndSortedElements] = useState([]);
  const [elementsToDisplay, setElementsToDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let result = [...dataSource];
    if (search.trim() !== "") {
      result = result.filter((element) =>
        (element[searchBy] || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => {
      const valueA = (a[searchBy] || "").toLowerCase();
      const valueB = (b[searchBy] || "").toLowerCase();
      return valueA.localeCompare(valueB, "pt-BR");
    });

    setFilteredAndSortedElements(result);
    setOffset(0);
  }, [search, dataSource, searchBy]);

  useEffect(() => {
    const nextBatch = filteredAndSortedElements.slice(0, offset + limit);
    setElementsToDisplay(nextBatch);
  }, [filteredAndSortedElements, offset]);

  const handleLoadMore = useCallback(() => {
    setOffset((prev) => prev + limit);
  }, [setOffset]);

  useEffect(() => {
    const handleScroll = () => {
      const table = document.querySelector(".table-container");
      if (!table) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = table.offsetHeight - 100;

      if (scrollPosition >= threshold) {
        if (elementsToDisplay.length < filteredAndSortedElements.length) {
          handleLoadMore();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleLoadMore, elementsToDisplay.length, filteredAndSortedElements.length]);

  return { search, setSearch, elementsToDisplay };
}