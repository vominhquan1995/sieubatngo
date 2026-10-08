# Siêu Bất Ngờ — Landing page

Trang giới thiệu (landing page) cho ý tưởng startup **Siêu Bất Ngờ**: nền tảng mô phỏng hội thoại bằng AI, giúp người dùng vượt qua nỗi lo giao tiếp bằng cách luyện tập tương tác. Sản phẩm dùng **kiến trúc hai tác nhân trên nền Claude (Anthropic)**:

- **Tác nhân Nhập vai Thích ứng** — giữ nhân vật động, bám ngữ cảnh (tiếng Anh, phỏng vấn, xung đột nơi làm việc).
- **Bộ Đánh giá Chẩn đoán** — phân tích từng lượt nói qua JSON nghiêm ngặt, chỉ lỗi về giọng điệu, ngữ pháp và thuyết phục, phản hồi tức thì để thử lại.

Trang được xây để nộp hồ sơ chương trình [Claude for Startups](https://platform.claude.com/offers/startups-application) và sẽ thay thế trang hiện tại tại https://sieubatngo.com/.

## Đặc điểm kỹ thuật

- **Tĩnh thuần** — chỉ HTML, CSS, JS. Không cần Node/bước build, chạy trực tiếp trên mọi hosting (kể cả shared hosting cPanel như Hawk Host).
- **Song ngữ Việt / Anh** — nút chuyển ngôn ngữ, lưu lựa chọn vào `localStorage`.
- **Sáng/Tối** — tự theo thiết lập hệ điều hành, có nút chuyển thủ công.
- **Responsive** — chạy tốt từ điện thoại tới desktop.
- **Tối ưu cơ bản** — thẻ SEO/Open Graph, `robots.txt`, `sitemap.xml`, `.htaccess` (gzip, cache, security headers).

## Cấu trúc thư mục

```
sieubatngo/
├── index.html            # Toàn bộ nội dung landing
├── assets/
│   ├── css/styles.css    # Giao diện
│   ├── js/main.js         # Chuyển ngôn ngữ, sáng/tối, hiệu ứng cuộn
│   └── img/favicon.svg    # Logo / favicon
├── .htaccess             # Cấu hình Apache cho cPanel (cache, HTTPS, headers)
├── robots.txt
├── sitemap.xml
├── README.md
└── DEPLOY.md             # Hướng dẫn deploy lên Hawk Host (chi tiết)
```

## Xem thử tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy một server tĩnh:

```bash
# Python 3
python3 -m http.server 8080
# rồi mở http://localhost:8080
```

## Deploy

Xem hướng dẫn chi tiết trong [`DEPLOY.md`](DEPLOY.md).

## Tùy chỉnh nhanh

- **Email liên hệ**: đang dùng `contact@sieubatngo.com` trong `index.html` (tìm `mailto:`), đổi thành email thật của bạn.
- **Nội dung**: mỗi câu có 2 phiên bản, `data-lang-vi` (tiếng Việt) và `data-lang-en` (tiếng Anh) — sửa cùng lúc cả hai.
- **Màu thương hiệu**: đổi các biến `--brand`, `--brand-2`, `--brand-3` ở đầu `assets/css/styles.css`.
