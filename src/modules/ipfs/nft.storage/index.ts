import fs from 'fs';
import { fromDwebLink } from '..';
import { PinFileResponse } from '../types';

export default async function uploadFile(file: File): Promise<PinFileResponse> {
  console.log('DEBUG: NFT_API_KEY IS', process.env.NFT_STORAGE_API_KEY);
  try {
    const response = await fetch('https://api.nft.storage/upload', {
      //@ts-ignore
      body: fs.createReadStream(file.path),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NFT_STORAGE_API_KEY || ''}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const json = await response.json();
    if (!json.ok) {
      console.log('DEBUG: JSON is', json);
      return {
        error: json.error.code + ': ' + json.error.message,
        uri: '',
        name: file.name || '',
        type: file.type || '',
      };
    }
    return {
      error: undefined,
      uri: fromDwebLink(json.value.cid),
      name: file.name || '',
      type: file.type || '',
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Upload error',
      uri: undefined,
      name: file.name || '',
      type: file.type || '',
    };
  }
}
