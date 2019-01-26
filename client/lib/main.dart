import 'package:flutter/material.dart';
import 'package:ddp/ddp.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  DdpClient client;
  List babiesNames = [];
  String connectionStatus = "connecting";
  Collection collection;

  void updateBabiesNames() {
    babiesNames = [];
    collection.findAll()
      ..forEach((String _id, Map document) {
        document["_id"] = _id;
        babiesNames.add(document);
      });
    setState(() {});
  }

  void subListener(String collectionName, String msg, String docId, Map map) {
    updateBabiesNames();
  }

  _initMeteorClient() {
    client = DdpClient("meteor", "ws://192.168.1.12:3000/websocket", "meteor");
    client.connect();
    client.addStatusListener((status) {
      if (status == ConnectStatus.connected) {
        connectionStatus = "connected";
        client.subscribe("babies.public", (done) {
          collection = done.owner.collectionByName("Babies");
          updateBabiesNames();
          collection.addUpdateListener(subListener);
        }, []);
        setState(() {});
      }
    });
  }

  @override
  void initState() {
    _initMeteorClient();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Baby Names"),
      ),
      body: this.connectionStatus == "connecting"
          ? Center(child: CircularProgressIndicator())
          : this.babiesNames.length == 0
              ? Center(child: Text("List is Empty"))
              : ListView.builder(
                  itemCount: this.babiesNames.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey),
                        borderRadius: BorderRadius.all(Radius.circular(10)),
                      ),
                      child: ListTile(
                        leading: Icon(Icons.person),
                        title: Text(this.babiesNames[index]["name"]),
                        trailing: IconButton(
                          icon: Icon(Icons.close), onPressed: () {
                            client.call("babies.remove", [this.babiesNames[index]["_id"]]);
                            updateBabiesNames();
                        }),
                      ),
                    );
                  },
                ),
    );
  }
}
