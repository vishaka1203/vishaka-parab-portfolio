import {
  ArrowUpRight,
  Link2,
  Activity,
  ShieldCheck,
  MoveUpRight,
} from "lucide-react";
export function ProjectArt({ kind }: { kind: string }) {
  return (
    <div
      className={`project-art art-${kind}`}
      aria-label="Conceptual project illustration, not a screenshot"
      role="img"
    >
      {kind === "curating" ? (
        <div className="frames-composition">
          <span className="frames-label">CURATING FRAMES / PHOTOGRAPHY</span>
          <div className="frames-pair">
            <div />
            <div />
          </div>
          <h4>
            Moments, <em>composed.</em>
          </h4>
          <span className="frames-label">AN EDITORIAL PERSPECTIVE</span>
        </div>
      ) : kind === "wushu" ? (
        <>
          <div className="art-grain" />
          <span className="art-corner">WUSHU / GOA</span>
          <div className="wushu-symbol">武</div>
          <div className="wushu-caption">
            Discipline in motion.
            <br />
            <small>SPORT · COMMUNITY · CULTURE</small>
          </div>
          <MoveUpRight className="art-arrow" size={36} />
        </>
      ) : kind === "hospital" ? (
        <div className="mini-browser">
          <div className="mini-nav">
            <b>
              <Activity size={15} /> care<span>+</span>
            </b>
            <span>Our care &nbsp; Specialists &nbsp; Contact</span>
          </div>
          <div className="care-layout">
            <div>
              <span className="eyebrow">HERE FOR YOUR HEALTH</span>
              <h4>
                Better care.
                <br />
                Brighter lives.
              </h4>
              <span className="mini-cta">
                Find your specialist <ArrowUpRight size={10} />
              </span>
            </div>
            <div className="medical-cross">+</div>
          </div>
          <div className="mini-stats">
            <span>
              <ShieldCheck size={17} /> Thoughtful care
            </span>
            <span>
              <Activity size={17} /> Connected services
            </span>
          </div>
        </div>
      ) : kind === "url" ? (
        <div className="link-demo">
          <div className="link-logo">
            <Link2 size={26} />
          </div>
          <span className="eyebrow">LESS LINK. MORE POSSIBILITY.</span>
          <h4>Long story, short.</h4>
          <div className="url-input">
            https://your-very-long-link.com/...
            <span>
              <ArrowUpRight size={18} />
            </span>
          </div>
          <div className="short-url">
            <span>↳</span> short.link / hello{" "}
            <span className="copy-mark">↗</span>
          </div>
        </div>
      ) : (
        <div className="portfolio-art">
          <span>VISHAKA PARAB</span>
          <h4>
            Design meets
            <br />
            <em>development.</em>
          </h4>
          <span>REACT / INTERFACES / IDEAS</span>
        </div>
      )}
      <span className="concept-label">CONCEPT VISUAL</span>
    </div>
  );
}
