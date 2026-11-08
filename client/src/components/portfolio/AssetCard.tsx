import { ArrowDownToLine, ArrowUpLeft, CirclePlay, FileText, Image as ImageIcon, Music2, Video } from "lucide-react";
import type { PortfolioAsset } from "@/data/portfolio";

type AssetCardProps = {
  asset: PortfolioAsset;
  onOpen: (asset: PortfolioAsset) => void;
  onCue?: () => void;
};

function kindLabel(kind: PortfolioAsset["kind"]) {
  switch (kind) {
    case "image": return "صورة";
    case "video": return "فيديو";
    case "audio": return "صوت";
    case "presentation": return "عرض تقديمي";
    case "pdf": return "ملف PDF";
    case "document": return "مستند";
    default: return "ملف";
  }
}

function FileVisual({ kind }: { kind: PortfolioAsset["kind"] }) {
  const Icon = kind === "video" ? Video : kind === "audio" ? Music2 : kind === "image" ? ImageIcon : FileText;
  return (
    <div className={`asset-visual-fallback fallback-${kind}`} aria-hidden="true">
      <span className="fallback-orbit" />
      <Icon size={34} strokeWidth={1.35} />
      {kind === "audio" && <span className="audio-bars"><i /><i /><i /><i /><i /><i /><i /></span>}
    </div>
  );
}

export function AssetCard({ asset, onOpen, onCue }: AssetCardProps) {
  const hasPreview = Boolean(asset.previewUrl);
  const displayName = asset.name;

  return (
    <article className="asset-card">
      <button
        className="asset-preview-button"
        type="button"
        onClick={() => { onCue?.(); onOpen(asset); }}
        aria-label={`استعراض ${displayName}`}
        title={displayName}
      >
        <span className="asset-visual" aria-hidden="true">
          {hasPreview ? (
            <img src={asset.previewUrl} alt="" loading="lazy" decoding="async" />
          ) : (
            <FileVisual kind={asset.kind} />
          )}
          <span className="asset-kind-pill">{kindLabel(asset.kind)}</span>
          <span className="asset-open-mark">
            {asset.kind === "video" ? <CirclePlay size={20} /> : <ArrowUpLeft size={17} />}
          </span>
        </span>
      </button>

      <div className="asset-card-body">
        <div className="asset-card-kicker">
          <span>{asset.categoryName}</span>
          {asset.sizeBytes ? <span>{formatBytes(asset.sizeBytes)}</span> : null}
        </div>
        <h3 dir="auto" title={displayName}>{displayName}</h3>
        {asset.description ? <p className="asset-description">{asset.description}</p> : null}
        <div className="asset-card-actions">
          <button className="text-action" type="button" onClick={() => { onCue?.(); onOpen(asset); }}>
            معاينة <ArrowUpLeft size={15} aria-hidden="true" />
          </button>
          {asset.downloadUrl ? (
            <a
              className="download-action"
              href={asset.downloadUrl}
              download={asset.downloadName || asset.name}
              onClick={onCue}
              aria-label={`تنزيل ${displayName}`}
            >
              <ArrowDownToLine size={15} aria-hidden="true" />
              تنزيل
            </a>
          ) : asset.driveUrl ? (
            <a
              className="download-action"
              href={asset.driveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={onCue}
              aria-label={`فتح ${displayName} في Google Drive`}
            >
              <ArrowUpLeft size={15} aria-hidden="true" />
              فتح المصدر
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} بايت`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} كيلوبايت`;
  return `${(kb / 1024).toFixed(1)} ميغابايت`;
}
