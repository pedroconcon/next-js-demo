import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

//
/*export const getServerSideProps = async (context) => {
    const req = context.req;
    const res = context.res;
    
    //fetch data from a API or file sistem
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
}*/

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://teste123:teste123@nextjs-app.c2xljpg.mongodb.net/meetups"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetUps = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetUps.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate:1,
  };
};

export default HomePage;
