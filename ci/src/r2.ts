/**
 * Cloudflare R2 相关
 */
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import fs from 'fs/promises'

const ACCOUNT_ID = process.env.ACCOUNT_ID || ''
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID || ''
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY || ''
const BUCKET_NAME = process.env.BUCKET_NAME || ''

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
})

export async function upload(remotePath: string, content: any, contentType = 'application/octet-stream') {
  return await S3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: remotePath,
    Body: content,
    ContentType: contentType
  }))
}

export async function uploadFile(remotePath: string, localPath: string, contentType = 'application/octet-stream') {
  return await upload(remotePath, await fs.readFile(localPath), contentType)
}

export async function uploadJson(remotePath: string, data: any) {
  return await upload(remotePath, JSON.stringify(data), 'application/json')
}

export async function getJson<T>(remotePath: string): Promise<T | null> {
  try {
    const response = await S3.send(new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: remotePath
    }))
    if (!response.Body) {
      return null
    }
    return JSON.parse(await response.Body.transformToString()) as T
  } catch (err) {
    return null
  }
}
