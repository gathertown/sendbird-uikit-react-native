import type { PartialNullable } from '@sendbird/uikit-utils';
import {
  getFileExtension,
  getFileExtensionFromMime,
  getFileExtensionFromUri,
  getMimeFromFileExtension,
  normalizeFileName,
} from '@sendbird/uikit-utils';

import type { FilePickerResponse, FileType } from '../platform/types';

const normalizeFile = async ({ uri, size, name, type }: PartialNullable<FileType>): Promise<FilePickerResponse> => {
  // URI is required property
  if (!uri) return null;

  let filename = name || String(Date.now());
  let filetype = type || '';

  const extension =
    getFileExtension(filename) || getFileExtensionFromMime(filetype) || (await getFileExtensionFromUri(uri));

  if (extension) {
    filename = normalizeFileName(filename, extension);
    if (!filetype || !isMimeType(filetype)) {
      filetype = getMimeFromFileExtension(extension);
    }
  }

  return { uri, name: filename, type: filetype, size: size ?? 0 };
};

function isMimeType(str: string) {
  const mimeTypeRegex = /^[a-z]+\/[a-z0-9\-+]+$/i;
  return mimeTypeRegex.test(str);
}

export default normalizeFile;
