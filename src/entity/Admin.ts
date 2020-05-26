import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, BeforeInsert, ManyToOne, ManyToMany } from "typeorm";
import { Exclude } from "class-transformer";
import Authority from "./Authority"

@Entity()
class Admin extends BaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ length: 20, nullable: false })
    account: string;

    @Index()
    @Column({ length: 10, nullable: true })
    phoneNumber: string;

    @Exclude()
    @Column({ length: 255, nullable: false })
    password: string;

    @Index()
    @Column({ length: 64, nullable: true })
    name: string;

    @Index()
    @Column({ length: 255, nullable: true })
    email: string;

    @Exclude()
    @Index()
    @Column({ nullable: false })
    createAt: Date; //會員創建時間(從申請送出時間開始算)

    @Exclude()
    @Index()
    @Column()
    errorCount: number; //密碼錯誤次數

    @Exclude()
    @Index()
    @Column()
    inUsed: boolean; // 是否啟用

    @Index()
    @Column({ nullable: true })
    isRoot: boolean; // 是否有最高權限

    @Exclude()
    @Index()
    @Column({ length: 255, nullable: true })
    note: string; //備註
    
    @ManyToOne( type => Authority, authority => authority.admins)
    authority: Authority;

    @BeforeInsert()
    initialize() {
        this.createAt = new Date();
        this.errorCount = 0;
        this.inUsed = true;
    }
}

export default Admin;