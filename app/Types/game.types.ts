export interface Game {
  studenID: string; // ชื่อคนประเมิน
  age: string; // อายุที่เลือก (9, 18, 30, ...)
  score: number; // คะแนนรวม

  gamedetail: gameDetail;
}

export interface gameDetail {
  game1: game1[] | [];
  game2: game2[] | [];
  game3: game3[] | [];
  game4: game4[] | [];

}

export interface game1 {
  name: string; //ข้อ 1 ด่าน 1
  pproposition: string; //โจทย์
  answer: string; //คำตอบ
  Right_wrong: boolean; //ถูกผิด
}

export interface game2 {
  name: string; //ข้อ 1 ด่าน 2
  pproposition: string; //โจทย์
  answer: string; //คำตอบ
  Right_wrong: boolean; //ถูกผิด
}

export interface game3 {
  name: string; //ข้อ 1 ด่าน 3

  VDO: string; //ลิงค์ VDO
  answer: string; //คำตอบ
  Right_wrong: boolean; //ถูกผิด
}

export interface game4 {
  name: string; //ข้อ 1 ด่าน 4
  pproposition: string; //โจทย์
  answer: string; //คำตอบ
  Right_wrong: boolean; //ถูกผิด
}

