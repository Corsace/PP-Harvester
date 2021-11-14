import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Index } from "typeorm";

export class OAuth {

    @Column({ default: null })
    userID!: string;

    @Index()
    @Column({ default: "" })
    username!: string;

    @Column({ type: "longtext", nullable: true, select: false })
    accessToken?: string;

    @Column({ type: "longtext", nullable: true, select: false })
    refreshToken?: string;

    @CreateDateColumn()
    dateAdded!: Date;

}

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID!: number;

    @Column(() => OAuth)
    discord!: OAuth;
    
    @Column(() => OAuth)
    osu!: OAuth;

    @Column({ default: false })
    onion!: boolean;

    @Column({ default: true })
    verified!: boolean;
}
