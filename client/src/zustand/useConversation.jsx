import { create } from 'zustand'
const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	loadConversation: false,
	setLoadConversations: (loadConversation) => set({ loadConversation }),
	isOpenCarosuel: false,
	setIsOpenCarosuel: (isOpenCarosuel) => set({ isOpenCarosuel }),
	selectedImage: '0',
	setSelectedImage: (selectedImage) => set({ selectedImage }),
}))
export default useConversation