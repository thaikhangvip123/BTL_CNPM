# S3-MRS - Smart Study Space Management & Reservation System

S3-MRS la he thong quan ly khong gian hoc tap tai Truong Dai hoc Bach khoa -
DHQG TP.HCM (HCMUT). He thong ho tro sinh vien tim kiem va dat cho hoc ca
nhan, phong hoc nhom; theo doi lich dat, check-in/check-out, danh gia phong va
gui yeu cau ho tro. Quan tri vien co giao dien rieng de quan ly tai khoan,
phong, thiet bi, dat cho, phan hoi va yeu cau ho tro.

> Trang thai hien tai: ban prototype/hoc phan. Frontend co the build, nhung he
> thong chua san sang de trien khai production. Xem muc
> [Han che da biet](#han-che-da-biet).

## Tinh nang hien co

### Sinh vien

- Dang nhap bang MSSV hoac email.
- Xem phong dang kha dung va thiet bi trong phong.
- Tim phong theo toa nha, tang, loai phong, ngay, gio va thiet bi.
- Dat ngay hoac dat truoc phong don/phong nhom.
- Xem, cap nhat, huy va theo doi lich su dat cho.
- Check-in/check-out bang thong tin phong/ma QR.
- Danh gia phong va gui yeu cau ho tro.
- Xem ho so ca nhan.

### Quan tri vien

- Dashboard thong ke.
- Quan ly tai khoan nguoi dung.
- Quan ly phong va danh sach thiet bi.
- Theo doi dat cho, danh gia va yeu cau ho tro.
- Khoa phong de bao tri.

## Kien truc

```text
S3MRSYS/
|- client/                 React 18 + Vite + Tailwind/MUI
|  `- src/                 Giao dien sinh vien
|- server/                 Express + EJS + MySQL
|  `- src/
|     |- controller/       Xu ly HTTP
|     |- service/          Nghiep vu va truy van SQL
|     |- routes/           API sinh vien va web admin
|     |- views/            Giao dien EJS cho admin
|     |- models/           Sequelize models
|     |- migrations/       Sequelize migrations
|     `- seeders/          Du lieu mau
|- database.sql            Schema va du lieu mau MySQL
`- README.md
```

He thong hien dung hai cach truy cap MySQL song song: truy van truc tiep qua
`mysql2` trong cac service va Sequelize cho models/migrations. Luong chay chinh
su dung cac service truy van SQL truc tiep.

## Yeu cau moi truong

- Node.js 20 LTS duoc khuyen nghi.
- npm 10 tro len.
- MySQL 8.x (hoac MariaDB tuong thich).
- Cong mac dinh: frontend `5173`, backend `8080`.

## Khoi tao co so du lieu

1. Tao/import database tu file `database.sql`:

   ```powershell
   mysql -u root -p < database.sql
   ```

   File dump tao database `BTL_CNPM` va chen du lieu mau.

2. Cap nhat thong tin ket noi trong `server/src/config/connectDB.js` cho dung
   MySQL tren may dang chay.

3. Neu su dung Sequelize CLI, cap nhat them
   `server/src/config/config.json` de thong tin ket noi dong bo.

Khong nen dua mat khau database that vao Git. Truoc khi trien khai, can chuyen
toan bo cau hinh database sang bien moi truong.

## Cau hinh backend

Sao chep `server/.env.example` thanh `server/.env`, sau do dien cac gia tri chi
su dung tren may local:

```dotenv
PORT=8080
REACT_URL=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=replace_with_local_mysql_password
DB_NAME=BTL_CNPM
JWT_SECRET=replace_with_a_long_random_value
SESSION_SECRET=replace_with_a_different_long_random_value
```

Khong commit `server/.env`. Chi commit `server/.env.example`, trong do khong co
gia tri secret that.

## Cai dat va chay

Mo hai terminal rieng.

### Backend

```powershell
cd server
npm ci
npm start
```

Backend va giao dien admin chay tai `http://localhost:8080`.

### Frontend sinh vien

```powershell
cd client
npm ci
npm run dev
```

Frontend chay tai `http://localhost:5173`.

Du lieu mau co san trong `database.sql`. Vi dump hien chua cung cap mot bo tai
khoan demo/mat khau nhat quan va an toan, hay tao hoac dat lai tai khoan test
trong moi truong local thay vi dung du lieu nay cho production.

## Lenh kiem tra

```powershell
cd client
npm run build
npm run lint
```

Backend hien chua co test tu dong; script `npm test` dang la placeholder.

## API chinh

Prefix API: `/api/v1`.

| Nhom | Endpoint tieu bieu |
| --- | --- |
| Xac thuc | `POST /login`, `POST /logout`, `GET /users/me` |
| Phong | `GET /available`, `GET /allroom` |
| Dat cho | `POST /booking`, `POST /booking/book-now`, `POST /check-availability` |
| Quan ly booking | `GET /bookings/student/:mssv`, `PATCH /bookings/update/:bookingId`, `POST /booking/:bookingId/cancel` |
| Check-in/out | `POST /bookings/:bookingId/checkin`, `POST /bookings/:bookingId/checkout` |
| Phan hoi/ho tro | `POST /feedback`, `GET /feedbacks`, `POST /support` |

## Mo hinh du lieu chinh

- `Users`: sinh vien va cac vai tro quan tri.
- `Rooms`: suc chua, vi tri, loai phong, trang thai va QR.
- `Devices`: thiet bi gan voi phong.
- `Bookings`: ngay, khung gio, so cho va trang thai dat phong.
- `CheckInOuts`: lich su vao/ra.
- `Feedbacks`: danh gia phong.
- `Support`: yeu cau ho tro.

## Han che da biet

### Can xu ly truoc khi he thong co the chay dung mo ta

1. **Chua co phong mentoring.** Schema va UI chi ho tro `single` va `group`;
   can them loai `mentoring`, quy tac dat phong va giao dien loc tuong ung.
2. **Tai nguyen phong chua duoc mo hinh hoa day du.** Thiet bi moi la chuoi ten;
   chua co thuoc tinh/kiem tra rieng cho anh sang, may chieu, cong cu hop truc
   tuyen, tinh trang kha dung va lich bao tri.
3. **Tinh so cho dang gan voi trang thai phong toan cuc, khong gan voi tung
   khung gio.** Dat mot lich trong tuong lai se tru ngay `available_seats`, trong
   khi logic xung dot lai chan moi booking trung gio. Can chon ro mo hinh dat
   tron phong hay dat theo cho va tinh kha dung tu cac booking trong tung slot.
4. **Bao mat API chua dat yeu cau.** Mot so endpoint xem/huy booking, gui/xem
   feedback, support va toan bo thao tac admin chua co middleware xac thuc/phan
   quyen day du. JWT, session secret va mat khau MySQL dang hard-code; dang nhap
   con chap nhan mat khau plain text va ghi thong tin nhay cam ra log.
5. **Cau hinh chua san sang cho deployment.** Frontend hard-code
   `http://localhost:8080`; chua co `VITE_API_URL`, reverse proxy, Docker hay
   cau hinh production. Backend se crash neu tai khoan MySQL khong trung voi
   thong tin trong `connectDB.js`.
6. **Schema khong dong bo.** `database.sql`, migrations va Sequelize models co
   khac biet ve trang thai booking, `booked_seats`, `room_type` va
   `available_seats`; khoi tao bang migration co the tao schema khong chay duoc
   voi service hien tai.
7. **Thieu quy tac nghiep vu quan trong.** Chua thay gio mo cua, gioi han dat
   truoc, gioi han thoi luong/so booking moi sinh vien, thoi gian check-in tre,
   no-show, phe duyet mentoring, hay chinh sach huy.
8. **Chua co test backend/integration/E2E.** Frontend lint hien con loi; chua co
   CI de kiem tra migration, API va cac tinh huong dat phong dong thoi.
9. **Mot so trang dieu huong la placeholder.** Cac route `/search`, `/reports`
   va `/support` trong `App.jsx` chua tro truc tiep den man hinh chuc nang that.
10. **Chua co tai lieu van hanh.** Can bo sung backup/restore, monitoring,
    audit log, xu ly loi cron, rate limiting va quy trinh cap nhat du lieu phong.

## Thu tu hoan thien de dat muc tieu MVP

1. Chuan hoa schema va sua logic kha dung/dat cho theo khung gio.
2. Bao ve API, them RBAC cho Student/Admin IT/Admin IoT/School va dua secrets
   sang bien moi truong.
3. Them phong mentoring va catalog tai nguyen phong, bao gom cong cu hop online.
4. Dua URL API/cau hinh DB sang bien moi truong va bo sung cau hinh production.
5. Them validation nghiep vu, test integration cho booking dong thoi va E2E cho
   cac luong dang nhap -> tim phong -> dat -> check-in -> check-out.
6. Hoan thien UI placeholder, tai lieu van hanh va pipeline CI/CD.
