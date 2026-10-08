# Hướng dẫn deploy lên Hawk Host (cPanel)

Trang này là **web tĩnh** nên deploy rất đơn giản: chỉ cần đưa toàn bộ file vào thư mục `public_html` của tên miền `sieubatngo.com`. Dưới đây là 3 cách, chọn 1. **Cách A** là đơn giản và được khuyến nghị.

> Lưu ý: trang mới sẽ **thay thế** nội dung trang `sieubatngo.com` hiện tại. Hãy **sao lưu** trang cũ trước khi ghi đè (xem mục "Sao lưu & thay thế an toàn").

---

## Chuẩn bị: nén thư mục thành file zip

Trên máy của bạn, trong thư mục `sieubatngo/`:

```bash
cd /home/quanvo/data-source/devops/sieubatngo
zip -r sieubatngo-site.zip index.html assets .htaccess robots.txt sitemap.xml
```

File `sieubatngo-site.zip` này là thứ bạn sẽ tải lên.

---

## Sao lưu & thay thế an toàn (làm trước khi ghi đè)

1. Đăng nhập cPanel của Hawk Host: thường là `https://sieubatngo.com:2083` hoặc link Hawk Host gửi trong email chào mừng.
2. Mở **File Manager** → vào thư mục gốc của tên miền:
   - Tên miền chính: `public_html`
   - Nếu là addon/subdomain: `public_html/sieubatngo.com` (tùy cấu hình của bạn).
3. Chọn tất cả file cũ → **Compress** thành `backup-cu.zip`, hoặc đổi tên `public_html` thành `public_html_backup` (nếu cPanel cho phép) để giữ bản cũ.
4. Sau khi có bản sao lưu, xóa/để trống các file cũ trong thư mục gốc (giữ lại thư mục hệ thống như `cgi-bin` nếu có).

---

## Cách A — File Manager (khuyến nghị, không cần cài gì)

1. Trong cPanel, mở **File Manager**.
2. Vào thư mục gốc tên miền (`public_html`).
3. Bấm **Upload**, chọn file `sieubatngo-site.zip` vừa tạo. Chờ lên 100%.
4. Quay lại File Manager, **chuột phải** vào `sieubatngo-site.zip` → **Extract** (giải nén) vào chính thư mục đó.
5. Đảm bảo `index.html` nằm **trực tiếp** trong `public_html` (không nằm trong thư mục con). Cấu trúc đúng:
   ```
   public_html/index.html
   public_html/assets/...
   public_html/.htaccess
   ```
   > Nếu giải nén ra một thư mục con (ví dụ `public_html/sieubatngo/index.html`), hãy vào thư mục con, chọn tất cả, **Move** ra `public_html`.
6. Xóa file `sieubatngo-site.zip` cho gọn.
7. Để thấy file `.htaccess`, bật **Settings → Show Hidden Files (dotfiles)** ở góc phải File Manager.

---

## Cách B — FTP / SFTP (FileZilla)

1. Lấy thông tin FTP trong cPanel → **FTP Accounts** (host, username, port 21 cho FTP hoặc 22 cho SFTP).
2. Mở **FileZilla**, kết nối tới host.
3. Bên phải (server) vào `public_html`.
4. Bên trái (máy bạn) vào thư mục `sieubatngo/`.
5. Kéo thả **toàn bộ** `index.html`, thư mục `assets/`, `.htaccess`, `robots.txt`, `sitemap.xml` sang `public_html`.
6. Trong FileZilla bật **Server → Force showing hidden files** để upload được `.htaccess`.

---

## Cách C — Git Version Control trong cPanel (kéo từ GitHub)

Dùng được khi bạn đã đẩy code lên GitHub (xem `GITHUB.md`).

1. Trong cPanel, mở **Git™ Version Control** → **Create**.
2. Dán **Clone URL** repo của bạn, ví dụ `https://github.com/<tai-khoan>/sieubatngo.git`.
3. Đặt **Repository Path**: ví dụ `/home/<cpanel_user>/repositories/sieubatngo`.
4. Sau khi clone xong, vì web tĩnh không có bước build, cách gọn nhất là trỏ document root hoặc copy file sang `public_html`. Hai lựa chọn:
   - **Copy thủ công** sau mỗi lần Pull: trong File Manager copy file từ thư mục repo sang `public_html`.
   - **Dùng `.cpanel.yml`** để cPanel tự copy khi Pull (file mẫu đã có sẵn trong repo, mục bên dưới).
5. Mỗi khi cập nhật code: push lên GitHub → vào cPanel Git → **Pull or Deploy** → **Update from Remote** → **Deploy HEAD Commit**.

File `.cpanel.yml` mẫu (đặt ở gốc repo — đổi `CPANEL_USER` thành username cPanel của bạn):

```yaml
---
deployment:
  tasks:
    - export DEPLOYPATH=/home/CPANEL_USER/public_html/
    - /bin/cp -R index.html $DEPLOYPATH
    - /bin/cp -R assets $DEPLOYPATH
    - /bin/cp .htaccess $DEPLOYPATH
    - /bin/cp robots.txt $DEPLOYPATH
    - /bin/cp sitemap.xml $DEPLOYPATH
```

---

## Bật HTTPS (SSL)

1. Trong cPanel mở **SSL/TLS Status** → chọn tên miền → **Run AutoSSL**. Hawk Host cấp SSL miễn phí (Let's Encrypt) tự động.
2. Sau khi SSL hoạt động (mở `https://sieubatngo.com` thấy ổ khóa), mở lại `.htaccess` và **bỏ dấu `#`** ở khối "Force HTTPS" để tự chuyển http sang https:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## Kiểm tra sau khi deploy

1. Mở `https://sieubatngo.com` ở chế độ ẩn danh (incognito) để tránh cache.
2. Kiểm tra:
   - Trang hiển thị đúng, có ảnh/logo.
   - Nút **EN/VI** chuyển ngôn ngữ.
   - Nút sáng/tối hoạt động.
   - Nút **Đăng ký dùng sớm** mở ứng dụng email tới `contact@sieubatngo.com`.
   - Mở trên điện thoại để chắc chắn responsive.
3. Nếu thấy trang cũ: xóa cache trình duyệt, hoặc trong cPanel kiểm tra có plugin cache (LiteSpeed Cache) thì **Flush**.

---

## Gỡ lỗi thường gặp

| Hiện tượng | Nguyên nhân & cách sửa |
|---|---|
| Vào web ra trang danh sách file | Thiếu `index.html` ở gốc, hoặc nó nằm trong thư mục con. Di chuyển ra `public_html`. |
| CSS/JS không tải (trang trắng trơn) | Thư mục `assets/` chưa được upload hoặc sai cấu trúc. Upload lại nguyên thư mục `assets`. |
| `.htaccess` không thấy | Bật **Show Hidden Files** trong File Manager. |
| Lỗi 500 sau khi thêm `.htaccess` | Một directive không được hosting hỗ trợ. Tạm đổi tên `.htaccess` thành `htaccess.txt` để xác nhận, rồi bỏ bớt khối gây lỗi. |
| Vẫn thấy trang cũ | Cache trình duyệt/CDN. Dùng incognito và flush LiteSpeed Cache trong cPanel. |
