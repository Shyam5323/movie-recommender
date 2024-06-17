"use client";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./app.css";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Link from "next/link";

function Home() {
  const ref = useRef();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("movieToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div>
      <Parallax pages={4} ref={ref}>
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(./moon.png)`,
            backgroundSize: "cover",
          }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(land.png)`,
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>
        <ParallaxLayer
          sticky={{ start: 0.9, end: 2.5 }}
          style={{ textAlign: "center" }}
        >
          <img src="cat.gif" alt="Cat" />
        </ParallaxLayer>
        <ParallaxLayer
          offset={0.2}
          speed={0.05}
          onClick={() => ref.current.scrollTo(3)}
        >
          <h2>Welcome to my website</h2>
        </ParallaxLayer>
        <ParallaxLayer
          offset={3}
          speed={2}
          onClick={() => ref.current.scrollTo(0)}
        >
          <h2>Get started with tracking your movies</h2>

          <div className="flex justify-center items-center">
            <Link href="./login">
              <button className="p-10 bg-transparent text-7xl font-bold text-white drop-shadow-xl">
                Login
              </button>
            </Link>
            <Link href="./register">
              <button className="p-10 bg-transparent text-7xl font-bold text-white drop-shadow-xl">
                Register
              </button>
            </Link>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default Home;
