import { NextRequest, NextResponse } from 'next/server';
import { Comment } from '@/lib/api-service';

// Mock data for comments
const mockComments: Comment[] = [
  {
    id: 1,
    newsId: 1,
    authorName: "John Doe",
    authorEmail: "john@example.com",
    content: "This is a great article! Very informative.",
    createdAt: "2024-03-20T10:00:00Z",
    status: "approved"
  },
  {
    id: 2,
    newsId: 1,
    authorName: "Jane Smith",
    authorEmail: "jane@example.com",
    content: "I have a question about the research methodology.",
    createdAt: "2024-03-20T11:30:00Z",
    status: "pending"
  }
];

// PATCH - Update comment status
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string; commentId: string } }
) {
  try {
    const newsId = parseInt(context.params.id);
    const commentId = parseInt(context.params.commentId);

    if (isNaN(newsId) || isNaN(commentId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const commentIndex = mockComments.findIndex(
      c => c.newsId === newsId && c.id === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    mockComments[commentIndex] = {
      ...mockComments[commentIndex],
      status: status as Comment['status']
    };

    return NextResponse.json(mockComments[commentIndex]);
  } catch (error) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a comment
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string; commentId: string } }
) {
  try {
    const newsId = parseInt(context.params.id);
    const commentId = parseInt(context.params.commentId);

    if (isNaN(newsId) || isNaN(commentId)) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const commentIndex = mockComments.findIndex(
      c => c.newsId === newsId && c.id === commentId
    );

    if (commentIndex === -1) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    mockComments.splice(commentIndex, 1);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
} 