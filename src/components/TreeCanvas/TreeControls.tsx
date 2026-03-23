import { ZoomIn, ZoomOut, Maximize2, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useTranslation } from '../../i18n';

interface TreeControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export function TreeControls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onExpandAll,
  onCollapseAll,
}: TreeControlsProps) {
  const { t } = useTranslation();

  return (
    <div className="tree-controls">
      <button onClick={onZoomIn} title={t.zoomIn}>
        <ZoomIn size={18} />
      </button>
      <button onClick={onZoomOut} title={t.zoomOut}>
        <ZoomOut size={18} />
      </button>
      <button onClick={onResetView} title={t.resetView}>
        <Maximize2 size={18} />
      </button>
      <div className="tree-controls__divider" />
      <button onClick={onExpandAll} title={t.expandAll}>
        <ChevronsDown size={18} />
      </button>
      <button onClick={onCollapseAll} title={t.collapseAll}>
        <ChevronsUp size={18} />
      </button>
    </div>
  );
}
