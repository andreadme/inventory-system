import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductIndex({ auth, categories, products }) {
    const headers = [
        {
            key: 'name',
            name: 'Product Name',
        },
        {
            key: 'product_category',
            name: 'Product Category',
        },
        {
            key: 'description',
            name: 'Description',
        },
        {
            key: 'quantity',
            name: 'Initial Stock',
        },
        {
            key: 'updated_at',
            name: 'Last Updated',
        }
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [buttonsVisibility, setButtonsVisibility] = useState({});
    const { data, setData, get, post, put, processing, errors, reset } = useForm({
        name: '',
        product_category: {
            label: categories[0].name,
            value: categories[0].id,
        },
        description: '',
        weight_per_sack: 0,
        quantity: 0,
    });

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const handleEdit = (productId) => {
        setIsEditMode(true);
        setIsDialogOpen(!isDialogOpen);

        axios.get(route('product.show', productId))
            .then(res => {
                setData(res.data);
            })
    }

    const toggleButtons = (rowId) => {
        setButtonsVisibility(prevState => ({
            ...prevState,
            [rowId]: !prevState[rowId]
        }));
    };

    const handleSelectChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEditMode) {
            axios.post(route('product.update', data))
            .then(res => {
                reset();
            })
            .catch(err => {
                console.log(err)
            });
        } else {
            post(route('product.create'), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    console.log(errors)
                },
            });
        }

        setIsDialogOpen(false);
        setIsEditMode(false);
        setButtonsVisibility({});
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Products</h2>}
        >
            <Head title="Products" />

            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div className="flex justify-between items-center">
                        <h2 class="text-2xl font-semibold leading-tight">Products List</h2>
                        <button
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={toggleDialog}
                        >
                            Make new product
                        </button>
                    </div>
                    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div
                            class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                        >
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {headers.map((header) => (
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                { header.name }
                                            </th>
                                        ))}
                                        <th
                                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div class="flex">
                                                    <div class="flex-shrink-0 w-10 h-10">
                                                        <img
                                                            class="w-full h-full rounded-full"
                                                            src="https://ui-avatars.com/api/?name=Coco+Pandan&color=7F9CF5&background=EBF4FF"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div class="ml-3">
                                                        <p class="text-gray-900 whitespace-no-wrap">
                                                        { product.name }
                                                        </p>
                                                        <p class="text-gray-600 whitespace-no-wrap">{ product.id }</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ product.product_category.name }</p>
                                                <p class="text-gray-900 whitespace-no-wrap">{ product.product_category.id }</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ product.description }</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ product.quantity }</p>
                                                {product.product_category.name === 'Wholesale' && <p class="text-gray-600 whitespace-no-wrap">Sack/s</p>}
                                                {product.product_category.name === 'Retail' && <p class="text-gray-600 whitespace-no-wrap">KG</p>}
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ moment(product.updated_at).format("DD-MM-YYYY hh:mm A") }</p>
                                            </td>
                                            <td
                                                class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                            >
                                                <div class="relative">
                                                    <button
                                                        type="button"
                                                        class="inline-block text-gray-500 hover:text-gray-700"
                                                        onClick={() => toggleButtons(product.id)}
                                                    >
                                                        <svg
                                                            class="inline-block h-6 w-6 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                            d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {buttonsVisibility[product.id] && (
                                                        <div class={`absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 flex-col text-center z-50`}>
                                                            <div class="p-2 hover:bg-slate-800 hover:text-white hover:cursor-pointer">
                                                                {/* Edit button */}
                                                                <button type="button" onClick={() => handleEdit(product.id)} className="text-center">Edit</button>
                                                            </div>
                                                            <div class="p-2 hover:bg-slate-800 hover:text-white hover:cursor-pointer">
                                                                {/* Delete button */}
                                                                <button type="button" onClick={() => handleDelete} className="text-center">Delete</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Product</h3>
                        <form onSubmit={submit}>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-300">
                                    {isEditMode 
                                        ? 'Update the details of the product.'
                                        : 'Fill out the details of the new product.'}</p>

                                {/* Dropdown for Product Categories */}
                                <select 
                                    id="product_category"
                                    value={JSON.stringify({label: data.product_category.label, value: data.product_category.value})}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => {
                                        const selectedCategory = JSON.parse(e.target.value);
                                        handleSelectChange('product_category', selectedCategory);
                                    }}>
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={JSON.stringify({label: category.name, value: category.id})}>{category.name}</option>
                                    ))}
                                </select>

                                {/* Input Fields */}
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="Name" 
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => handleSelectChange('name', e.target.value)}
                                />
                                {errors.name && <span>This field is required</span>}
                                <TextInput
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    placeholder="Description" 
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                    onChange={(e) => handleSelectChange('description', e.target.value)}
                                />
                                <div className="mt-3">
                                    <label>Quantity</label>
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        value={data.quantity}
                                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                        onChange={(e) => handleSelectChange('quantity', e.target.value)}
                                    />
                                </div>

                                {data.product_category.label === 'Wholesale' && (
                                    <div className="mt-3">
                                        <label>Weight per sack</label>
                                        <TextInput
                                            id="weight_per_sack"
                                            type="number"
                                            name="weight_per_sack"
                                            value={data.weight_per_sack}
                                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
                                            onChange={(e) => handleSelectChange('weight_per_sack', e.target.value)}
                                        />
                                    </div>
                                )}
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
                                    {isEditMode ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            <ToastContainer />
        </AuthenticatedLayout>
    );
}
