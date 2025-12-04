/* eslint-disable @typescript-eslint/no-explicit-any */
// Helper function to safely get nested values (React Admin usually handles this,
// but custom components need manual retrieval if not using standard Fields)
export function getRecordValue(obj: any, path: string) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}
