const convertValueToString = (value, depth) => {
  if (typeof value !== "object" || value === null) {
    return String(value);
  }

  return Object.entries(value)
    .map(([key, val]) => {
      const indent = " ".repeat(depth * 4);

      if (typeof val === "object" && val !== null) {
        const childValue = convertValueToString(val, depth + 1).split("\n");

        return [`${indent}${key}: {`, ...childValue, `${indent}}`].join("\n");
      }

      return `${indent}${key}: ${String(val)}`;
    })
    .join("\n");
};

const stylish = (tree) => {
  const iter = (diff, depth = 1) => {
    const indent = " ".repeat(depth * 4);
    const symbolIndent = " ".repeat(depth * 4 - 2);

    return diff.flatMap((node) => {
      if (node.status === "added") {
        if (typeof node.value === "object" && node.value !== null) {
          return [
            `${symbolIndent}+ ${node.key}: {`,
            ...convertValueToString(node.value, depth + 1).split("\n"),
            `${indent}}`,
          ];
        }
        return `${symbolIndent}+ ${node.key}: ${convertValueToString(node.value, depth)}`;
      }

      if (node.status === "removed") {
        if (typeof node.value === "object" && node.value !== null) {
          return [
            `${symbolIndent}- ${node.key}: {`,
            ...convertValueToString(node.value, depth + 1).split("\n"),
            `${indent}}`,
          ];
        }

        return `${symbolIndent}- ${node.key}: ${convertValueToString(node.value, depth)}`;
      }

      if (node.status === "changed") {
        const oldValue =
          typeof node.oldValue === "object" && node.oldValue !== null
            ? [
                `${symbolIndent}- ${node.key}: {`,
                ...convertValueToString(node.oldValue, depth + 1).split("\n"),
                `${indent}}`,
              ]
            : `${symbolIndent}- ${node.key}: ${convertValueToString(node.oldValue, depth)}`;

        const newValue =
          typeof node.newValue === "object" && node.newValue !== null
            ? [
                `${symbolIndent}+ ${node.key}: {`,
                ...convertValueToString(node.newValue, depth + 1).split("\n"),
                `${indent}}`,
              ]
            : `${symbolIndent}+ ${node.key}: ${convertValueToString(node.newValue, depth)}`;

        return [oldValue, newValue].flat();
      }

      if (node.status === "unchanged") {
        return `${indent}${node.key}: ${convertValueToString(node.value, depth)}`;
      }

      if (node.status === "nested") {
        const children = iter(node.children, depth + 1);
        return [`${indent}${node.key}: {`, ...children, `${indent}}`].join("\n");
      }
    });
  };
  const lines = iter(tree, 1);
  return ["{", ...lines, "}"].join("\n");
};

export default stylish;
