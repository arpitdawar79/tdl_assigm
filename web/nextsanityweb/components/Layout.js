import Head from "next/head";
import Link from "next/link";

export default function Layout(props) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>this is a test project</title>
      </Head>
      <nav>
        <Link href="/">
          <a>Movies</a>
        </Link>
        <Link href="/">
          <a>Menu Item</a>
        </Link>
        <Link href="/">
          <a>Menu Item</a>
        </Link>
        <Link href="/">
          <a>Menu Item</a>
        </Link>
        <Link href="/">
          <a>Menu Item</a>
        </Link>
      </nav>
      <div id="main">{props.children}</div>
      <footer>
        
      </footer>
      <style jsx>{`

        nav {
          position: fixed;
          padding: 25px;
          top: 0;
          left: 0;
          width: 100%;
          background-color: #333;
          font-size: 20px;
          
        }

        nav a {
          color: #fff;
          text-decoration: none;
          text-align: center;
          margin-right: 30px;
        }
        #main{
          margin-top: 50px;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: "Avenir", Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: #2c3e50;
          padding: 3.5rem 0 0;
        }
      `}</style>
    </div>
  );
}
