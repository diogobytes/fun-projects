
import Directory from "../../components/directory/directory.component";
const Home = () => {

  const categories = [
    {
      id: 1,
      title: 'Action Figures',
      imageUrl: 'https://images.unsplash.com/photo-1608278047522-58806a6ac85b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
      id: 2,

      title: 'Comic Books',
      imageUrl: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29taWMlMjBib29rc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      title: 'Clothes',
      imageUrl: 'https://images.unsplash.com/photo-1532202802379-df93d543bac3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
    },
    {
      id: 4,
      title: 'Cosplay',
      imageUrl: 'https://images.unsplash.com/photo-1596079320875-ff665fa4a5dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvc3BsYXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 5,
      title: 'Pop Figures',
      imageUrl: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
    },
  ]
  return (
    <div>
    <Directory categories={categories} />
    </div>
  );
}

export default Home;
