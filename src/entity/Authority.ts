import { Entity, PrimaryGeneratedColumn, Column, Index, BaseEntity, BeforeInsert, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import Admin from "./Admin";

@Entity()
class Authority extends BaseEntity {

    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ length: 20, nullable: false })
    role: string;

    @OneToMany( type => Admin, admin => admin.authority)
    admins: Admin[];

    @Exclude()
    @Index()
    @Column({ nullable: false })
    createAt: Date; //該權限的創建時間

    @BeforeInsert()
    initialize() {
        this.createAt = new Date();
    }

}

export default Authority;