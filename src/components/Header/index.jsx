import styles from "./Header.module.css";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { supabase } from "../../utils/supabase";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setShowProfileMenu(false);
  };
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    carregarUsuario();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      carregarUsuario();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function carregarUsuario() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (!user) {
      setRole(null);
      setName("");
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .select("name, role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setRole(data.role);

    // pega apenas o primeiro nome
    setName(
      data.name
        .trim()
        .split(" ")[0]
        .toUpperCase()
    );
  }

  async function handleLogout() {
    await supabase.auth.signOut();

    setShowProfileMenu(false);
    closeMenu();

    navigate("/");
  }

  function getDashboardRoute() {

    if (
      role === "teacher"
      || role === "coordinator"
      || role === "admin"
    ) {
      return "/dashboard";
    }

    // if (role === "coordinator") {
    //   return "/coordinator";
    // }

    // if (role === "admin") {
    //   return "/admin";
    // }

    return "/";
  }

  return (
    <header className={styles.header}>
      {/* botão menu */}
      <div
        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ""
          }`}
        onClick={toggleMenu}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* logo */}
      <section className={styles.logo}>
        <Link to="/">
          <img src="/logo.png" alt="Logo da escola" />

          <span>
            <h3>EE Aristófanes Fernandes</h3>
            <p>São Vicente, RN</p>
          </span>
        </Link>
      </section>

      {/* overlay */}
      {isMenuOpen && (
        <div
          className={styles.overlay}
          onClick={closeMenu}
        ></div>
      )}

      {/* navegação */}
      <nav
        className={`${styles.nav} ${isMenuOpen ? styles.sidebarOpen : ""
          }`}
      >
        <Link to="/" onClick={closeMenu}>
          Início
        </Link>

        <Link to="/arquivos" onClick={closeMenu}>
          Arquivos
        </Link>

        <Link to="/eventos" onClick={closeMenu}>
          Eventos
        </Link>

        <Link to="/contatos" onClick={closeMenu}>
          Contatos
        </Link>

        {!user ? (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        ) : (
          <div
            className={styles.profileContainer}
            ref={profileRef}
          >
            <div
              className={styles.userInfo}
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }
            >
              <FaUserCircle className={styles.avatar} />

              <span className={styles.userName}>
                {name}
              </span>
            </div>

            {showProfileMenu && (
              <div className={styles.profileMenu}>
                <Link
                  to={getDashboardRoute()}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <button onClick={handleLogout}>
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;