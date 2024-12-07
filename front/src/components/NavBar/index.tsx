"use client";

import Link from 'next/link';
import styles from './index.module.css';
import { NavConfig, NavItem } from '@/config/navConfig';
import Image from 'next/image';
import ShoppingBag from '../Shopping Bag';
import CustomSearchBar from '../SearchBar';
import TemporaryDrawer from '../Drawer';

export const NavBar: React.FC = () => {
    return (
        <nav className={styles.header}>

            <div className={styles.temporaryDrawer}>
                <TemporaryDrawer />
            </div>

            <div className={styles.searchBar}>
                <CustomSearchBar />
            </div>

            <ul className={styles.navigationPillList}>
                {NavConfig.map((el: NavItem) => {
                    return (
                        <li className={styles.navigationPill} key={el.path}>
                            <Link href={el.path} className={styles.title}>
                                <span>
                                    <Image
                                        className={styles.icon}
                                        src={el.icon}
                                        alt={`${el.text} icon`}
                                        width={22}
                                        height={22}
                                    />
                                    {el.text}
                                </span>
                            </Link>
                        </li>
                    );
                })}

                <li className={styles.navigationPill}>
                    <ShoppingBag />
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
