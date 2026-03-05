
import Navbar from '../component/Navbar';
import Upload from '../component/upload';
import Footer from '../component/footer';
import Display from '../component/display';

function Home() {

  return (
    <>
      <div style={{ border: '2px solid black' }}>
        <Navbar />
      </div>
      <br></br>
      <div style={{ border: '2px solid black' }}>
        <Display />
      </div>
      <br></br>
      <div style={{ border: '2px solid black' }}>
        <Upload />
      </div>
      <br></br>
      <div style={{ border: '2px solid black' }}>
        <Footer />
      </div>
    </>
  );
}

export default Home;