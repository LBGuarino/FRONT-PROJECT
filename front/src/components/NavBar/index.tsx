import Link from 'next/link';
import styles from './index.module.css';
import { NavConfig, NavItem } from '@/config/navConfig';
import Image from 'next/image';
import ShoppingBag from '../ShoppingBag';
import CustomSearchBar from '../SearchBar/index';
import TemporaryDrawer from '../Drawer';
import ClientNavActions from '../ClientNavActions';

export default function NavBar(){
    return (
        <nav className={styles.header}>


            <div className={styles.temporaryDrawer}>
                <TemporaryDrawer />
            </div>


            
            <div className={styles.logoContainer}>
                <Link href='/'>
                    <img src='/images/logo.svg' alt="logo" className={styles.logo} />
                </Link>
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

                <li className={styles.navigationPill}>
                    <ClientNavActions />
                </li>

            </ul>
            <ul className={styles.mobileNavigationPillList}>
                <li className={styles.navigationPill}>
                    <ShoppingBag />
                </li>

                <li className={styles.navigationPill}>
                    <ClientNavActions />
                </li>

            </ul>

        </nav>
    );
};

