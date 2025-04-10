import { TableDemo } from "./Table";

const Users = () => {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-full p-4 ">
            <h1>manage users</h1>
            <TableDemo/>
        </div>
    );
};

export default Users;