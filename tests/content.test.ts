import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = 'src/content/projects'

interface ProjectFrontmatter {
  file: string
  id: string
  title: string
  description: string
  date: string
  category: string
  status?: string
  priority: number
  tags?: string[]
  impact: string
  thumbnail: string
  github?: string
  demo?: string
  stack?: string[]
}

const projects: ProjectFrontmatter[] = readdirSync(PROJECTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => {
    const raw = readFileSync(join(PROJECTS_DIR, f), 'utf-8')
    return { file: f, ...matter(raw).data } as ProjectFrontmatter
  })

const validCategories = [
  'finance-quant',
  'ops-automation',
  'data-math',
  'system-ui',
  'ai-implementation',
  'software-engineering',
]

const validStatuses = [
  'In Progress',
  'Production',
  'Archived',
  'Research & Development',
  'Audit Pending',
]

describe('Content Schema Validation', () => {
  it('4.1 should have exactly 5 projects', () => {
    expect(projects).toHaveLength(5)
  })

  it('4.2 each project has required fields', () => {
    const required = ['id', 'title', 'description', 'date', 'category', 'priority', 'impact', 'thumbnail'] as const
    projects.forEach((p) => {
      required.forEach((field) => {
        expect(p[field], `${p.file} missing ${field}`).toBeDefined()
      })
    })
  })

  it('4.3 date matches YYYY-MM-DD', () => {
    projects.forEach((p) => {
      expect(p.date, p.file).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  it('4.4 category is whitelisted', () => {
    projects.forEach((p) => {
      expect(validCategories, p.file).toContain(p.category)
    })
  })

  it('4.4b status is whitelisted (if set)', () => {
    projects.forEach((p) => {
      if (p.status !== undefined) {
        expect(validStatuses, p.file).toContain(p.status)
      }
    })
  })

  it('4.5 priority is int 1-10', () => {
    projects.forEach((p) => {
      expect(Number.isInteger(p.priority), p.file).toBe(true)
      expect(p.priority, p.file).toBeGreaterThanOrEqual(1)
      expect(p.priority, p.file).toBeLessThanOrEqual(10)
    })
  })

  it('4.5b priorities are unique (no duplicate rank)', () => {
    const seen = new Map<number, string>()
    projects.forEach((p) => {
      expect(seen.has(p.priority), `priority ${p.priority} duplicated: ${seen.get(p.priority)} vs ${p.file}`).toBe(false)
      seen.set(p.priority, p.file)
    })
  })

  it('4.6 thumbnail is /images/projects/<slug>/thumbnail.webp', () => {
    projects.forEach((p) => {
      expect(p.thumbnail, p.file).toMatch(/^\/images\/projects\/.+\.webp$/)
    })
  })

  it('4.6b thumbnail file exists in public/', () => {
    projects.forEach((p) => {
      expect(existsSync(join('public', p.thumbnail)), `${p.file} -> public${p.thumbnail}`).toBe(true)
    })
  })

  it('4.7 github/demo are valid URLs when set', () => {
    projects.forEach((p) => {
      for (const field of ['github', 'demo'] as const) {
        const url = p[field]
        if (url) {
          expect(url, `${p.file} ${field}`).toMatch(/^https?:\/\//)
        }
      }
    })
  })

  it('4.8 ids are unique', () => {
    const ids = projects.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('4.9 title min length 5', () => {
    projects.forEach((p) => {
      expect(p.title.length, p.file).toBeGreaterThanOrEqual(5)
    })
  })

  it('4.10 description min length 10 + impact min length 20', () => {
    projects.forEach((p) => {
      expect(p.description.length, p.file).toBeGreaterThanOrEqual(10)
      expect(p.impact.length, p.file).toBeGreaterThanOrEqual(20)
    })
  })

  it('4.11 tags/stack max 12 items', () => {
    projects.forEach((p) => {
      if (p.tags) expect(p.tags.length, `${p.file} tags`).toBeLessThanOrEqual(12)
      if (p.stack) expect(p.stack.length, `${p.file} stack`).toBeLessThanOrEqual(12)
    })
  })
})
