# Ebook Converter API

Sample Ebook Converter API for Pixel Reader Backend. Used for different ebook format converting to epub file. 

## Prerequisite
- Make sure you install Calibre app in your machine. Just go to this link: [https://calibre-ebook.com/download](https://calibre-ebook.com/download)
- Don't forget to locate the installation path for Calibre and paste to .env file "CALIBRE_LIB_PATH". For example in windows: `C://Program Files//Calibre2//ebook-convert.exe`

- AWS Account for S3 Storage and generate access key id and secret key

## Usage

- copy env.local as .env
- install dependencies and dev dependencies
  ```bash
  npm install
  ```
- run as development
  ```bash
  npm run dev
  ```
- run build for production
  ```bash
  npm run build
  ```
- run in server production
  ```bash
  npm start
  ```
- code format
  ```bash
  npm run format
  ```

# Endpoint

- use postman to test endpoint

```txt
POST http://localhost:5000/convert

Body:
 - form-data
    - file (tested only in PDF but this will accept any format)
```
