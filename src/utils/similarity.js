export function getSimilarityScore(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\W+/));
  const words2 = new Set(text2.toLowerCase().split(/\W+/));
  const common = [...words1].filter((word) => words2.has(word));
  return common.length / Math.max(words1.size, 1);
}
