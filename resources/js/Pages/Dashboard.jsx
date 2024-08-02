import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';

export default function Dashboard({ auth, inventory_logs, products }) {
    const headers = [
        {
            key: 'product_name',
            name: 'Product Name',
        },
        {
            key: 'product_category',
            name: 'Product Category',
        },
        {
            key: 'current_stock',
            name: 'Current Stock',
        },
        {
            key: 'last_updated',
            name: 'Last Updated',
        },
        {
            key: 'status',
            name: 'Status',
        }
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id_and_name_and_category_id: '',
        quantity_added: 0,
        quantity_sold: 0,
        display_sacks: false,
    });

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const handleSelectChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('inventory.log.create'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.log(errors)
            },
        });

        setIsDialogOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <button onClick={() => console.log('clicked')} className="p-6 text-gray-900 dark:text-gray-100">Click me</button>
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold leading-tight">Product Summary</h2>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={toggleDialog}
                        >
                            Make new inventory
                        </button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {headers.map((header) => (
                                            <th
                                                key={"header-key-"+header.key}
                                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                { header.name }
                                            </th>
                                        ))}
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventory_logs.map((inventory_log) => (
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            className="w-full h-full rounded-full"
                                                            src="https://ui-avatars.com/api/?name=Coco+Pandan&color=7F9CF5&background=EBF4FF"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                        { inventory_log.name }
                                                        </p>
                                                        <p className="text-gray-600 whitespace-no-wrap">{ inventory_log.id }</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ inventory_log.category }</p>
                                                <p className="text-gray-900 whitespace-no-wrap">{ inventory_log.category_id }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ inventory_log.current_stock }</p>
                                                {inventory_log.category === 'Wholesale' && <p className="text-gray-600 whitespace-no-wrap">Sack/s</p>}
                                                {inventory_log.category === 'Retail' && <p className="text-gray-600 whitespace-no-wrap">KG</p>}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ moment(inventory_log.latest_updated_at).format("DD-MM-YYYY hh:mm A") }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span
                                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                >
                                                    <span
                                                        aria-hidden
                                                        className={`absolute inset-0 opacity-50 rounded-full
                                                            ${ inventory_log.stock_status === 'Out of stock'
                                                                ? 'bg-red-200' 
                                                                : inventory_log.stock_status === 'Low stock' 
                                                                ? 'bg-orange-400'
                                                                :'bg-green-200'}`}
                                                    ></span>
                                                    <span className="relative">{ inventory_log.stock_status }</span>
                                                </span>
                                            </td>
                                            <td
                                                className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                            >
                                                <button
                                                type="button"
                                                className="inline-block text-gray-500 hover:text-gray-700"
                                                >
                                                <svg
                                                    className="inline-block h-6 w-6 fill-current"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                    d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                    />
                                                </svg>
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

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-lg">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Inventory</h3>
                        <form onSubmit={submit}>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-300">Make a new inventory. Select the product and category you want to update.</p>

                                {/* Dropdown for Products */}
                                <select 
                                    id="product_id_and_name_and_category_id"
                                    value={data.product_id_and_name_and_category_id}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => {
                                        handleSelectChange('product_id_and_name_and_category_id', e.target.value);
                                    }}>
                                    <option value="" disabled>Select a product</option>
                                    {products.map(product => (
                                        <option key={"product-id-"+product.id} value={`${product.id},${product.product_category.id},${product.name}`}>{product.product_name_w_category}</option>
                                    ))}
                                </select>

                                {/* Input Fields */}
                                <div className="mt-3">
                                    <label>Quantity added</label>
                                    <TextInput
                                        id="quantity_added"
                                        type="number"
                                        name="quantity_added"
                                        value={data.quantity_added}
                                        placeholder="Quantity Added" 
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                        onChange={(e) => handleSelectChange('quantity_added', e.target.value)}
                                    />
                                    {errors.quantity_added && <span>This field is required</span>}
                                </div>

                                <div className="mt-3">
                                    <label>Quantity sold</label>
                                    <TextInput
                                        id="quantity_sold"
                                        type="number"
                                        name="quantity_sold"
                                        value={data.quantity_sold}
                                        placeholder="Quantity Sold" 
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                        onChange={(e) => handleSelectChange('quantity_sold', e.target.value)}
                                    />
                                    {errors.quantity_sold && <span>This field is required</span>}
                                </div>

                                <div className="mt-3">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="display_sacks"
                                            checked={data.display_sacks}
                                            onChange={(e) => handleSelectChange('display_sacks', e.target.checked)}
                                        />
                                        <span className="ml-2">Display sacks?</span>
                                    </label>
                                    {errors.display_sacks && <span>This field is required</span>}
                                </div>

                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                    onClick={toggleDialog}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
