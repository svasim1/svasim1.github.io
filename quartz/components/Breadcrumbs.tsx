import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import breadcrumbsStyle from "./styles/breadcrumbs.scss"
import { FullSlug, SimpleSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import { trieFromAllFiles } from "../util/ctx"

type CrumbData = {
  displayName: string
  path: string
}

interface BreadcrumbOptions {
  /**
   * Symbol between crumbs
   */
  spacerSymbol: string
  /**
   * Name of first crumb
   */
  rootName: string
  /**
   * Whether to look up frontmatter title for folders (could cause performance problems with big vaults)
   */
  resolveFrontmatterTitle: boolean
  /**
   * Whether to display the current page in the breadcrumbs.
   */
  showCurrentPage: boolean
}

const defaultOptions: BreadcrumbOptions = {
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  showCurrentPage: true,
}

function formatCrumb(displayName: string, baseSlug: FullSlug, currentSlug: SimpleSlug): CrumbData {
  return {
    displayName: displayName.replaceAll("-", " "),
    path: resolveRelative(baseSlug, currentSlug),
  }
}

export default ((opts?: Partial<BreadcrumbOptions>) => {
  const options: BreadcrumbOptions = { ...defaultOptions, ...opts }
  const Breadcrumbs: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    ctx,
  }: QuartzComponentProps) => {
    const trie = (ctx.trie ??= trieFromAllFiles(allFiles))
    const slugParts = fileData.slug!.split("/")
    const pathNodes = trie.ancestryChain(slugParts)

    if (!pathNodes) {
      return null
    }

    const crumbs: CrumbData[] = pathNodes.map((node, idx) => {
      const crumb = formatCrumb(node.displayName, fileData.slug!, simplifySlug(node.slug))
      if (idx === 0) {
        crumb.displayName = options.rootName
      }

      // For last node (current page), set empty path
      if (idx === pathNodes.length - 1) {
        crumb.path = ""
      }

      return crumb
    })

    if (!options.showCurrentPage) {
      crumbs.pop()
    }

    if (crumbs.length <= 2) {
      return (
        <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
          {crumbs.map((crumb, index) => (
            <div class="breadcrumb-element">
              <a href={crumb.path}>{crumb.displayName}</a>
              {index !== crumbs.length - 1 && <p>{` ${options.spacerSymbol} `}</p>}
            </div>
          ))}
        </nav>
      )
    }

    const firstCrumb = crumbs[0]
    const lastCrumb = crumbs[crumbs.length - 1]
    const middleCrumbs = crumbs.slice(1, -1)

    return (
      <nav class={classNames(displayClass, "breadcrumb-container")} aria-label="breadcrumbs">
        <div class="breadcrumb-element">
          <a href={firstCrumb.path}>{firstCrumb.displayName}</a>
          <p>{` ${options.spacerSymbol} `}</p>
        </div>
        <div class="breadcrumb-element breadcrumb-ellipsis">
          <details>
            <summary>...</summary>
            <div class="breadcrumb-ellipsis-menu" role="list">
              {middleCrumbs.map((crumb) => (
                <a href={crumb.path} role="listitem">
                  {crumb.displayName}
                </a>
              ))}
            </div>
          </details>
          <p>{` ${options.spacerSymbol} `}</p>
        </div>
        <div class="breadcrumb-element">
          <a href={lastCrumb.path}>{lastCrumb.displayName}</a>
        </div>
      </nav>
    )
  }
  Breadcrumbs.css = breadcrumbsStyle

  return Breadcrumbs
}) satisfies QuartzComponentConstructor
