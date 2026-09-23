const formatValue = (value) => {
  if (value === null) {
    return `${value}`;
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return `${value}`;
  }
  if (typeof value === "object") {
    return "[complex value]";
  }
};

const formatPlain = (tree) => {
  const iter = (nodes, ancestry) => {
    return nodes
      .filter((node) => node.status !== "unchanged")
      .map((node) => {
        const property = [...ancestry, node.key].join(".");
        switch (node.status) {
          case "added":
            return `Property '${property}' was added with value: ${formatValue(node.value)}`;
          case "removed":
            return `Property '${property}' was removed`;
          case "changed":
            return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
          case "nested":
            return iter(node.children, [...ancestry, node.key]).join("\n");
          default:
            throw new Error(`Unknown status: ${node.status}`);
        }
      });
  };

  const result = iter(tree, []);
  return result.join("\n");
};

export default formatPlain;
