export interface Setting {
    DataSet_id: number; // รหัสชุดข้อมูล
    age: string; // อายุที่เลือก (9, 18, 30, ...)
    banner: string; // รูปภาพแบนเนอร์
    SidePro: SidePro[]; // รูปภาพด้านข้าง
}

export interface SidePro {
    SidePro_id: number; // รหัสรูปภาพด้านข้าง
    Name: string; // ชื่อรูปภาพด้านข้าง
    status: string; // สถานะของรูปภาพ (เช่น "active", "inactive")
    DataSet_id: number; // รหัสชุดข้อมูลที่เกี่ยวข้อง
    Proposition: Proposition[]; // คำอธิบายหรือโจทย์ที่เกี่ยวข้องกับรูปภาพ
    Vdo?: Vdo[]; // ลิงค์วิดีโอที่เกี่ยวข้อง ? คืออาจไม่มีวิดีโอ
}

export interface Proposition {
    Proposition_id: number; // รหัสโจทย์
    Point: string; // คะแนนที่ได้จากโจทย์
    Proposition: string; // ข้อความโจทย์
    Propositionimage: string | null; // รูปภาพที่เกี่ยวข้องกับโจทย์
    Answerimage: number;
    status: string;
    SidePro_id: number; // รูปภาพคำตอบที่ถูกต้อง
    Answer: any; // คำตอบที่ถูกต้อง (อาจเป็นข้อความหรือข้อมูลอื่นๆ)
}

export interface Vdo {
    Side_id: number; // รหัสรูปภาพด้านข้างที่เกี่ยวข้อง
    Name: string; // ชื่อวิดีโอ
    status: string; // สถานะของวิดีโอ (เช่น "active", "inactive")
    DataSet_id: number; 
    // รหัสชุดข้อมูลที่เกี่ยวข้อง
    VDO: VDO_id[]; // ลิงค์วิดีโอ
}

export interface VDO_id {
    VDO_id: number;
    Proposition: string; // ข้อความโจทย์ที่เกี่ยวข้องกับวิดีโอ
    url: string; // ลิงค์วิดีโอ
    Answer: number; // คำตอบที่ถูกต้องสำหรับวิดีโอ
    status: string; // สถานะของวิดีโอ (เช่น "active", "inactive")
    Side_id: number; // รหัสรูปภาพด้านข้างที่เกี่ยวข้อง
}

