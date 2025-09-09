import React, { useState, useEffect } from 'react';
import { Plus, List, Heart, ShoppingCart, User, Trash2, Edit3 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { Header } from './Header';
import { storage } from '../utils/storage';
import { mockProducts } from '../utils/mockData';
import type { Product, CustomList } from '../types';

interface CustomListsScreenProps {
  language: string;
  onBack: () => void;
  onProductSelect: (product: Product) => void;
}

export const CustomListsScreen: React.FC<CustomListsScreenProps> = ({
  language,
  onBack,
  onProductSelect
}) => {
  const { t } = useTranslation(language);
  const [lists, setLists] = useState<CustomList[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'routine' | 'shopping' | 'custom'>('custom');

  useEffect(() => {
    // Mock custom lists
    const mockLists: CustomList[] = [
      {
        id: '1',
        name: 'Routine visage',
        description: 'Mes produits de soin du visage',
        productIds: ['1', '3'],
        createdAt: new Date(),
        category: 'routine'
      },
      {
        id: '2',
        name: 'Liste d\'achats',
        description: 'Produits à acheter ce mois',
        productIds: ['2'],
        createdAt: new Date(),
        category: 'shopping'
      }
    ];
    setLists(mockLists);
  }, []);

  const createList = () => {
    if (newListName.trim()) {
      const newList: CustomList = {
        id: Date.now().toString(),
        name: newListName,
        productIds: [],
        createdAt: new Date(),
        category: selectedCategory
      };
      setLists([...lists, newList]);
      setNewListName('');
      setShowCreateModal(false);
    }
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'routine': return Heart;
      case 'shopping': return ShoppingCart;
      default: return List;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'routine': return 'from-pink-400 to-rose-400';
      case 'shopping': return 'from-blue-400 to-indigo-400';
      default: return 'from-purple-400 to-pink-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <Header title="Mes listes" showBackButton onBack={onBack} />
      
      <div className="p-4">
        {/* Create List Button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mb-6 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Créer une nouvelle liste</span>
        </button>

        {/* Lists */}
        <div className="space-y-4">
          {lists.map((list) => {
            const Icon = getCategoryIcon(list.category || 'custom');
            const products = mockProducts.filter(p => list.productIds.includes(p.id));
            
            return (
              <div key={list.id} className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(list.category || 'custom')} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{list.name}</h3>
                      <p className="text-sm text-gray-600">{list.description}</p>
                      <p className="text-xs text-gray-500">{products.length} produit(s)</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => deleteList(list.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Products Preview */}
                {products.length > 0 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {products.slice(0, 3).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => onProductSelect(product)}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden"
                      >
                        <img
                          src={product.image || 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    {products.length > 3 && (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-500">+{products.length - 3}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Créer une liste</h3>
              
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Nom de la liste"
                className="w-full p-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none"
              />

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Catégorie</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'routine', name: 'Routine', icon: Heart },
                    { id: 'shopping', name: 'Achats', icon: ShoppingCart },
                    { id: 'custom', name: 'Autre', icon: List }
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`p-3 rounded-xl border-2 transition-colors ${
                          selectedCategory === cat.id
                            ? 'border-pink-400 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                        <p className="text-xs text-gray-600">{cat.name}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={createList}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-xl font-medium"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};