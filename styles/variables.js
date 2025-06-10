import fs from 'fs'

const parseCssVariables = () => {
  const content = fs.readFileSync('styles/base/colors.css', 'utf8')
  const result = {
    light: {},
    dark: {},
    all: {} // Combined for backward compatibility
  }

  // Parse light mode (root variables outside media queries)
  const lightRootMatch = content.match(/:root\s*{([^}]*)}/s)
  if (lightRootMatch) {
    const lightVars = lightRootMatch[1].match(/--[\w-]+:\s*[^;]+/g) || []
    lightVars.forEach(match => {
      const [key, value] = match.split(':').map(s => s.trim())
      result.light[key] = value
      result.all[key] = value // Default to light mode
    })
  }

  // Parse dark mode variables
  const darkMediaMatch = content.match(/@media\s*\([^)]*prefers-color-scheme:\s*dark[^)]*\)[^{]*{([\s\S]*?)}\s*$/m)
  if (darkMediaMatch) {
    const mediaContent = darkMediaMatch[1]
    // Find all CSS variables in the media query content
    const darkVars = mediaContent.match(/--[\w-]+:\s*[^;]+/g) || []
    darkVars.forEach(match => {
      const [key, value] = match.split(':').map(s => s.trim())
      result.dark[key] = value
    })
  }

  return result
}

export const getVariables = () => parseCssVariables()

// Export structured variables
export const variables = new Proxy({}, {
  get(target, prop) {
    const vars = parseCssVariables()
    if (prop === 'light') {
      return new Proxy(vars.light, {
        get(target, key) {
          return target[key.startsWith('--') ? key : `--${key}`]
        }
      })
    }
    if (prop === 'dark') {
      return new Proxy(vars.dark, {
        get(target, key) {
          const varKey = key.startsWith('--') ? key : `--${key}`
          // Return dark mode value if exists, otherwise fall back to light mode
          return target[varKey] || vars.light[varKey]
        }
      })
    }
    // For backward compatibility, return from 'all' (light mode values)
    return vars.all[prop.startsWith('--') ? prop : `--${prop}`]
  },
  ownKeys() {
    return ['light', 'dark', ...Object.keys(parseCssVariables().all)]
  },
  has(target, prop) {
    const vars = parseCssVariables()
    return prop === 'light' || prop === 'dark' || prop in vars.all
  }
})
