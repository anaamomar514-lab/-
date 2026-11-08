import { ArrowDownToLine, ArrowUpLeft, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PortfolioAsset } from "@/data/portfolio";

type AssetPreviewDialogProps = {
  asset: PortfolioAsset | null;
  onClose: () => void;
};

export function AssetPreviewDialog({ asset, onClose }: AssetPreviewDialogProps) {
  return (
    <Dialog open={Boolean(asset)} onOpenChange={(open) => { if (!open) onClose(); }}>
      {asset ? (
        <DialogContent className="asset-dialog" dir="rtl">
          <DialogHeader className="asset-dialog-header">
            <span className="eyebrow">{asset.categoryName}</span>
            <DialogTitle dir="auto">{asset.name}</DialogTitle>
            <DialogDescription>
              {asset.description || "معاينة من الملفات الأصلية الموجودة في الحقيبة المهنية."}
            </DialogDescription>
          </DialogHeader>

          <div className="asset-dialog-viewer">
            {asset.kind === "image" && asset.viewUrl ? (
              <img className="dialog-image" src={asset.viewUrl} alt={asset.name} />
            ) : null}

            {asset.kind === "video" && asset.viewUrl ? (
              <video
                className="dialog-video"
                src={asset.viewUrl}
                poster={asset.previewUrl}
                controls
                playsInline
                preload="metadata"
                aria-label={asset.name}
              />
            ) : null}

            {asset.kind === "audio" && asset.viewUrl ? (
              <div className="dialog-audio-wrap">
                <div className="dialog-audio-art" aria-hidden="true"><span className="audio-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span></div>
                <audio src={asset.viewUrl} controls preload="metadata" aria-label={asset.name} />
              </div>
            ) : null}

            {asset.viewIsPdf && asset.viewUrl ? (
              <iframe className="dialog-pdf" src={`${asset.viewUrl}#view=FitH`} title={`معاينة ${asset.name}`} />
            ) : null}

            {!asset.viewUrl && asset.driveUrl ? (
              <div className="drive-fallback">
                <p>تعذّرت معاينة هذا الملف بصيغته الأصلية داخل الصفحة؛ يمكن فتح المصدر في Google Drive.</p>
                <a className="button button-primary" href={asset.driveUrl} target="_blank" rel="noreferrer">
                  فتح الملف في Google Drive <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            ) : null}

            {!asset.viewUrl && !asset.driveUrl ? (
              <div className="drive-fallback"><p>لا تتوفر معاينة لهذا الملف.</p></div>
            ) : null}
          </div>

          <DialogFooter className="asset-dialog-footer">
            {asset.downloadUrl ? (
              <a className="button button-primary" href={asset.downloadUrl} download={asset.downloadName || asset.name}>
                تنزيل {asset.downloadUrl && asset.kind === "presentation" ? "العرض الأصلي" : "الملف"}
                <ArrowDownToLine size={16} aria-hidden="true" />
              </a>
            ) : null}
            {asset.driveUrl && asset.downloadUrl ? (
              <a className="button button-quiet" href={asset.driveUrl} target="_blank" rel="noreferrer">
                المصدر في Drive <ArrowUpLeft size={16} aria-hidden="true" />
              </a>
            ) : null}
          </DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
