// Temporary stubs to avoid TypeScript errors when optional libs not installed.
// Remove after installing real dependencies.
declare module 'framer-motion' {
  export const motion: any;
}
declare module 'canvas-confetti' {
  const confetti: any;
  export default confetti;
}