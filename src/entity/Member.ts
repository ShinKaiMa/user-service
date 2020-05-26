import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, BeforeInsert } from "typeorm";
import { Exclude } from "class-transformer";


@Entity()
class Member extends BaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ length: 10, nullable: false })
    phoneNumber: string;

    @Exclude()
    @Column({ length: 255, nullable: false })
    password: string;

    @Index()
    @Column({ length: 64, nullable: false })
    name: string;

    @Index()
    @Column({ length: 64, nullable: false })
    liaison: string; //聯絡人

    @Index()
    @Column({ length: 255, nullable: false })
    address: string;

    @Index()
    @Column({ length: 255, nullable: true })
    email: string;

    @Exclude()
    @Index()
    @Column({ nullable: false })
    createAt: Date; //會員創建時間(從申請送出時間開始算)

    @Exclude()
    @Index()
    @Column({ nullable: false })
    needToResetPswd: boolean; // 是否需要立即重設密碼

    @Index()
    @Column()
    inUsed: boolean; // 是否啟用

    @Exclude()
    @Index()
    @Column({ length: 255, nullable: true })
    note: string; //備註

    @Index()
    @Column({ length: 255 })
    taxId: string; //統編

    @BeforeInsert()
    initialize() {
        this.createAt = new Date();
        this.inUsed = false;
        this.needToResetPswd = false;
    }
}

export default Member;