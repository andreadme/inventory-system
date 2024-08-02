import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';

export default function ProductCategoryIndex({ auth, categories }) {
    const headers = [
        {
            key: 'name',
            name: 'Category Name',
        },
        {
            key: 'description',
            name: 'Description',
        },
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    const handleSelectChange = (key, value) => {
        setData(prev => ({ ...prev, [key]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('product.category.create'), {
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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Product Categories</h2>}
        >
            <Head title="Products" />

            <div class="container mx-auto px-4 sm:px-8">
                <div class="py-8">
                    <div className="flex justify-between items-center">
                        <h2 class="text-2xl font-semibold leading-tight">Product Categories List</h2>
                        <button
                            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
                            onClick={toggleDialog}
                        >
                            Make new category
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
                                    {categories.map((category) => (
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
                                                        { category.name }
                                                        </p>
                                                        <p class="text-gray-600 whitespace-no-wrap">{ category.id }</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ category.description }</p>
                                            </td>
                                            <td
                                                class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                            >
                                                <button
                                                type="button"
                                                class="inline-block text-gray-500 hover:text-gray-700"
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
                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Category</h3>
                        <form onSubmit={submit}>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-300">Fill out the details of the new category.</p>

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
