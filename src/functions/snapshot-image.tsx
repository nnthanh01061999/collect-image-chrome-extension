import SnapShotImage from '@/components/content/snapshot-image/SnapshotImage';
import { SNAPSHOT_IMAGE } from '@/constants';
import { injectReact } from '@/functions/inject-react';

export const snapshotImage = (src: string) => {
    injectReact(SNAPSHOT_IMAGE, <SnapShotImage src={src} />);
};
