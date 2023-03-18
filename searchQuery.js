
  const handleSearchQuery = (query) => {
    setSearchQuery(query);

    if (query.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  };