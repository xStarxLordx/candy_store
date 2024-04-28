import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { alerts } from "../alert";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../Images/candyStore1.jpg";
import * as Icon from "react-bootstrap-icons";
import Sidebar from "../Ui/Sidebar";
import Nav from "./Nav";
import "../CSS/styles.css";


const Inventory = () => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [details, setDetails] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState(null);
    const [candies, setCandies] = useState([]);
    const [title, setTitle] = useState("");
    const [task, setTask] = useState(1);

    useEffect(() => {
        getCandy();
    }, []);
    const getCandy = async () => {
        const response = await axios.get("http://localhost:4000/api/candy");
        setCandies(response.data);
    };

    const openModal = (task, name, type, details, quantity, price, id) => {
        setName("");
        setType("");
        setDetails("");
        setQuantity("");
        setPrice("");
        setTask(task)
        if (task === 1) {
            setTitle("Add New Candy")
        } else if (task === 2) {
            setTitle("Edit candy")
            setName(name);
            setType(type);
            setDetails(details);
            setQuantity(quantity);
            setPrice(price);
            setId(id)
        }
        window.setTimeout(function () {
            document.getElementById("name").focus();
        }, 500)
    }

    const deleteCandy = (id, name) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: "Are you sure you want to delete '" + name + "' from your inventory?",
            icon: "question",
            text: "You won't be able to undo this delete.",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel"
        }).then((res) => {
            if (res.isConfirmed) {
                sendRequest("DELETE", { _id: id });
            } else {
                alerts("Deleting request canceled.", "info")
            }
        })
    }

    const check = () => {
        var data;
        var method
        console.log(task)
        if (name.trim() === "") {
            alerts("Candy name can't be blank.", "warning")
        } else if (type.trim() === "") {
            alerts("Candy type can't be blank.", "warning")
        } else if (details.trim() === "") {
            alerts("Candy details can't be blank.", "warning")
        } else if (quantity === "") {
            alerts("Candy quantity can't be blank.", "warning")
        } else if (price === "") {
            alerts("Candy price can't be blank.", "warning")
        } else {
            if (task === 1) {
                data = { name: name, type: type, details: details, quantity: quantity, price: price };
                method = "POST";
            } else {
                data = { _id: id, name: name, type: type, details: details, quantity: quantity, price: price };
                method = "PUT";
            }
            sendRequest(method, data)
        }
    }
    const sendRequest = async (method, data) => {
        console.log(data)
        await axios({ method: method, url: "http://localhost:4000/api/candy", data: data }).then(function (res) {
            console.log(res.data)

            alerts(res.statusText, "success");
            if (res.status === 200) {
                document.getElementById("closebtn").click();
                getCandy();
            }
        }).catch(function (error) {
            alerts("Request error", "error")
        })
    }
    const [toggle, setToggle] = useState(true)
    const Toggle = () => {
        setToggle(!toggle)
    }
    const findCandy = async (data) =>{
        if(data!==""){
            fetch("http://localhost:4000/api/candy")
            .then((res) => res.json())
            .then((json) =>{
                const result = json.filter((candy) => {
                    return (candy && candy.name && candy.name.toLowerCase().includes(data.toLowerCase())) || (candy && candy.type && candy.type.toLowerCase().includes(data.toLowerCase()))
                })
                console.log(result)
            setCandies(result);
            });
        }
        if(data===""){
            getCandy()
        }
        return
    }
    return (

        <div className="wrapper ">
            <img className="bgImage" src={bgImage}></img>
            {
                toggle && <Sidebar />
            }
            <div className="container-fluid">
                <Nav Toggle={Toggle}  userName={window.localStorage.getItem("userName")}/>
                
                <div className="p-5 w-100 ">
                        <form className="d-flex justify-content-center" >
                            <input
                                className="form-control me-sm-2 border border-black border-2"
                                style={{ width: "50%", alignSelf: "center", maxWidth: "700px" }}
                                type="text"
                                placeholder="Search candy..."
                                onChange={(e) => { findCandy(e.target.value) }}
                            />
                            <div className="p-3 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className=" btn btn-danger border-white border-2"
                                    style={{ width: "200px", alignSelf: "center" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => openModal(1)}
                                >
                                    <Icon.PlusCircleFill /> Add New Candy
                                </button>
                            </div>
                        </form>
                    </div>
                <div className="row">
                    <div className="container-fluid ">
                        <div className="table-responsive px-5 ">
                            <table className="  table table-hover table-bordered  border-black">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Details</th>
                                        <th>Inventory</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {candies.map((candy, i) => (
                                        <tr key={candy.id}>
                                            <td> {i + 1} </td>
                                            <td>{candy.name}</td>
                                            <td>{candy.type}</td>
                                            <td>{candy.details}</td>
                                            <td>{candy.quantity}</td>

                                            <td>
                                                ${new Intl.NumberFormat("en-us").format(candy.price)}
                                            </td>
                                            <td>
                                                <button className="btn btn-primary "
                                                    onClick={() => openModal(2, candy.name, candy.type, candy.details, candy.quantity, candy.price, candy._id)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal"
                                                >
                                                    <Icon.PencilSquare />
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-danger "
                                                    onClick={() => deleteCandy(candy._id, candy.name)}
                                                >
                                                    <Icon.Trash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal fade "
                id="exampleModal"
                tabindex="-1"
                aria-hidden="true"

            >
                <div className="modal-dialog modal-dialog-centered">

                    <div className=" modal-content ">

                        <div className="modal-header text-capitalize">
                            <label className="text-center fw-bolder"> {title} </label>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                arial-lable="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className=" input-group mb-3">
                                <span className=" input-group-text ">
                                    {" "}
                                    <Icon.Pencil color="black" />
                                </span>
                                <input
                                    type="text"
                                    id="name"
                                    className=" form-control "
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>

                            </div>
                            <div className=" input-group mb-3">
                                <span className=" input-group-text ">
                                    {" "}
                                    <Icon.BookmarkPlus color="black" />
                                </span>
                                <input
                                    type="text"
                                    id="type"
                                    className=" form-control "
                                    placeholder="Type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                ></input>
                            </div>
                            <div className=" input-group mb-3">
                                <span className=" input-group-text ">
                                    {" "}
                                    <Icon.CardText color="black" />
                                </span>
                                <input
                                    type="text"
                                    id="details"
                                    className=" form-control "
                                    placeholder="Details"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                ></input>
                            </div>
                            <div className=" input-group mb-3">
                                <span className=" input-group-text ">
                                    {" "}
                                    <Icon.CartPlus color="black" />
                                </span>
                                <input
                                    type="text"
                                    id="quantity"
                                    className=" form-control "
                                    placeholder="Quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                ></input>
                            </div>
                            <div className=" input-group mb-3">
                                <span className=" input-group-text ">
                                    {" "}
                                    <Icon.CurrencyDollar color="black" />
                                </span>
                                <input
                                    type="text"
                                    id="price"
                                    className=" form-control "
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </div>
                            <div className=" d-grid  col-3 mx-auto">
                                <button
                                    className="btn btn-success "
                                    onClick={() => check()}
                                >
                                    <Icon.Floppy />
                                    {"   "}
                                    Save

                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button id="closebtn" type="button" className="btn btn-secondary " data-bs-dismiss="modal"> Close </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
