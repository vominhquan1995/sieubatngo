# Đưa dự án lên GitHub

Repo đã được `git init` và commit sẵn ở máy. Việc còn lại là tạo repo trên GitHub và `push`.

> **Lưu ý về xác thực:** Trong `~/.git-credentials` có sẵn token cho tài khoản `vominhquan1995`, nhưng khi kiểm tra token này **đã hết hạn** (GitHub API trả về "Bad credentials"). Vì vậy cần một token mới trước khi push. Làm theo một trong hai cách dưới.

---

## Cách 1 — Dùng Personal Access Token mới (HTTPS, không cần cài gì)

1. Vào https://github.com/settings/tokens → **Generate new token**.
   - Token (classic): tick quyền **`repo`**.
   - Hoặc Fine-grained token: cấp quyền **Contents: Read and write** cho repo sẽ tạo.
2. Tạo repo rỗng trên GitHub: https://github.com/new → đặt tên `sieubatngo` → **không** tick "Add a README" → **Create repository**.
3. Ở máy, trong thư mục dự án, nối remote và push (thay `<tai-khoan>` và dán token khi được hỏi mật khẩu):

```bash
cd /home/quanvo/data-source/devops/sieubatngo
git branch -M main
git remote add origin https://github.com/<tai-khoan>/sieubatngo.git
git push -u origin main
# Username: <tai-khoan GitHub>
# Password: <dán Personal Access Token vừa tạo>
```

Vì `credential.helper=store` đang bật, token sẽ được lưu lại cho các lần push sau.

> Nếu muốn cập nhật token cũ đã hết hạn trong `~/.git-credentials`, mở file đó và thay dòng `github.com` bằng token mới, hoặc chỉ cần push một lần rồi nhập token mới — nó sẽ tự lưu đè.

---

## Cách 2 — Dùng GitHub CLI (`gh`)

`gh` hiện **chưa được cài** trên máy. Nếu muốn dùng:

```bash
# Cài gh (Debian/Ubuntu/WSL)
sudo apt update && sudo apt install gh -y

# Đăng nhập (mở trình duyệt hoặc dán token)
gh auth login

# Tạo repo và push trong một lệnh, ngay trong thư mục dự án
cd /home/quanvo/data-source/devops/sieubatngo
gh repo create sieubatngo --public --source=. --remote=origin --push
```

---

## Sau khi push

- Repo của bạn: `https://github.com/<tai-khoan>/sieubatngo`
- Có thể bật **GitHub Pages** để xem thử online (Settings → Pages → Branch `main` /root), nhưng bản chính vẫn deploy lên Hawk Host theo `DEPLOY.md`.
- Mỗi lần sửa code:

```bash
git add -A
git commit -m "Cập nhật nội dung landing"
git push
```
