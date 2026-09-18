// ─── EVENTS DATA ────────────────────────────────────────────────────────────
// Thêm event mới vào đầu mảng EVENTS (hiển thị mới nhất trước)

import img20vs20       from '../assets/20vs20.png'
import imgOverpacking  from '../assets/overpacking.png'
import imgMouthCarry   from '../assets/ngam_mangkhunglong.png'
import imgMixpack      from '../assets/tuongtackhacloai.png'
import imgScanner      from '../assets/phathiengianlan.png'

export const EVENTS = [
  {
    id: 'showmatch-refund-vs-sbtc',
    type: 'SHOWMATCH',
    status: 'COMPLETED',           // UPCOMING | LIVE | COMPLETED
    badge: 'ĐẠI CHIẾN',
    title: 'TEAM REFUND VS TEAM SBTC',
    subtitle: 'SHOWMATCH ĐẠI CHIẾN 20 VS 20',
    date: '17/09/2026',
    time: '23:00',
    image: img20vs20,
    description:
      'TEAM REFUND và TEAM SBTC chính thức đối đầu trong trận đại chiến 20 VS 20. Chiến thuật Ban/Pick, cách xây dựng đội hình và khả năng bảo vệ Vua & Tướng quyết định đội chiến thắng.',
    format: {
      mode: '20 VS 20',
      bo: 'BO3',
      timePerMatch: '15 phút / trận',
      note: 'Đội hình do Chủ Tướng của mỗi team quyết định',
    },
    rules: [
      {
        tag: '01',
        title: 'THỂ THỨC THI ĐẤU',
        items: [
          '20 VS 20 — BO3 — 15 phút / trận',
          'Đội hình do Chủ Tướng lựa chọn',
          'Mỗi team đăng ký 20 thành viên thi đấu',
        ],
      },
      {
        tag: '02',
        title: 'QUY TẮC BAN / PICK',
        items: [
          'TEAM REFUND: Ban 01 loài — TEAM SBTC: Ban 01 loài',
          'Loài bị Ban không được cả hai team sử dụng',
          'Được thay đổi ban sau mỗi trận',
          'Mỗi team chọn tối đa 5 loài, tối đa 4 cá thể mỗi loài',
        ],
      },
      {
        tag: '03',
        title: 'XÁC ĐỊNH THẮNG',
        items: [
          'Tiêu diệt toàn bộ đối phương → THẮNG NGAY',
          'Hết 15 phút: so Số Người Còn Sống',
          'Nếu bằng nhau: so Tổng HP còn lại',
        ],
      },
    ],
    highlights: ['40 người chơi', '2 thế lực', '1 chiến trường'],
    discord: 'https://discord.gg/sbtcisland',
  },
]

// ─── SERVER FEATURES ─────────────────────────────────────────────────────────
// Tính năng mới được ra mắt trên SBTC ISLAND

export const SERVER_FEATURES = [
  {
    id: 'overpacking',
    tag: 'RA MẮT TÍNH NĂNG',
    title: 'TỰ ĐỘNG XỬ LÝ OVERPACKING',
    image: imgOverpacking,
    summary:
      'Hệ thống tự động phát hiện và trừng phạt Overpacking — cùng loài tập trung quá đông, giúp server cân bằng hơn.',
    details: [
      'Giới hạn số cá thể cùng loài đi chung',
      'Cảnh báo sau 8 phút, phạt sau 10 phút',
      'Trừ MÁU và NƯỚC nếu không tách ra',
      'Áp dụng cho khủng long từ 40% Growth trở lên',
    ],
  },
  {
    id: 'mouth-carry',
    tag: 'RA MẮT TÍNH NĂNG',
    title: 'NGÂM & MANG KHỦNG LONG CON',
    image: imgMouthCarry,
    summary:
      'Mouth Carry cho phép khủng long bố/mẹ ngâm và di chuyển con non cùng loài, tăng tính tương tác gia đình.',
    details: [
      'Nhấn G để ngâm khủng long con cùng loài',
      'Bố/mẹ cần 70% Growth, con cần ≤25% Growth',
      'Không thể tấn công khi đang ngâm con',
      'Chỉ áp dụng cùng loài (Own Species Only)',
    ],
  },
  {
    id: 'mixpack',
    tag: 'RA MẮT HỆ THỐNG',
    title: 'TỰ ĐỘNG XỬ LÝ TƯƠNG TÁC XÃ HỘI KHÁC LOÀI',
    image: imgMixpack,
    summary:
      'Hệ thống chống Mixpack — tự động cảnh báo và trừ chỉ số khi 2 loài khác nhau đứng gần nhau quá lâu.',
    details: [
      'Đếm 10 phút nếu 2 loài khác nhau đứng gần nhau',
      'Cảnh báo ở phút 8 (120 giây) và phút 9 (60 giây)',
      'Quá 10 phút: Tự động trừ Nước + MÁU mỗi 5 giây',
      'Ngoại lệ khi đang giao tranh thật sự',
    ],
  },
  {
    id: 'scanner',
    tag: 'HỆ THỐNG BẢO MẬT',
    title: 'SBTC SCANNER — ANTI-CHEAT',
    image: imgScanner,
    summary:
      'SBTC Scanner v2.1 tự động phát hiện cheat, mod, hook memory và các công cụ gian lận trong game.',
    details: [
      'Quét Registry BAM, Prefetch Log, Disk Storage',
      'Phân tích Memory — phát hiện DLL Hook, RWX Private',
      'Báo cáo chi tiết gửi Admin ngay lập tức',
      'Vi phạm bị ban không được khiếu nại',
    ],
  },
]

// ─── SERVER SCHEDULE ──────────────────────────────────────────────────────────
export const SERVER_SCHEDULE = {
  restarts: [
    { time: '11:00', label: '11 giờ sáng' },
    { time: '18:00', label: '6 giờ chiều' },
    { time: '22:00', label: '10 giờ tối' },
  ],
  note: 'Các khung giờ này cố định mỗi ngày. Vui lòng KHÔNG giao tranh 10 phút trước mỗi giờ restart.',
}
