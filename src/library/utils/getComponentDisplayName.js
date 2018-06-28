/* @flow */

export default function getComponentDisplayName(
  Component: React$ComponentType<*>
): string {
  return typeof Component === 'string'
    ? Component
    : Component.displayName || Component.name || 'Component';
}
