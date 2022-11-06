const rootNode = document.getElementById("app");
const root = ReactDOM.createRoot(rootNode);


const Map = function (props) {
    return (<div class="container"><div id={props.mapId}></div></div>);
};

root.render(
    <Map mapId="map" />
);


// function ticTime() {
//     const timeD = ReactDOM.createRoot(document.getElementById("timeD"));
//     timeD.render(
//         <CurrTime />
//     );
// };
// const CurrTime = () => {
//     return (<h2>current time {new Date().toLocaleTimeString()}</h2>);
// };

// setInterval(ticTime, 1000);

