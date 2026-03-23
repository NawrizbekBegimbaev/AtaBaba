from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import FamilyMember
from .serializers import FamilyMemberSerializer, FamilyMemberTreeSerializer


class FamilyMemberViewSet(viewsets.ModelViewSet):
    queryset = FamilyMember.objects.all()
    serializer_class = FamilyMemberSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]


@api_view(['GET'])
def family_tree(request):
    """Return the entire family tree as nested JSON, starting from root nodes."""
    roots = FamilyMember.objects.filter(parent__isnull=True)
    if roots.count() == 1:
        serializer = FamilyMemberTreeSerializer(roots.first(), context={'request': request})
        return Response(serializer.data)
    serializer = FamilyMemberTreeSerializer(roots, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def family_stats(request):
    """Return basic statistics."""
    total = FamilyMember.objects.count()
    max_gen = FamilyMember.objects.order_by('-generation').values_list('generation', flat=True).first() or 0
    return Response({
        'total_people': total,
        'generations': max_gen,
    })
